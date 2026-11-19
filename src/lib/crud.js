import { guard, json, fail, isId, readBody } from "./api";

// Chhota helper: admin-only create / update / delete, field whitelist ke saath.
// fields: { name: "string" | "list" | "number" | "bool" | "enum:a,b" }
function pick(body, fields) {
  const out = {};
  for (const [k, type] of Object.entries(fields)) {
    if (!(k in body)) continue;
    const v = body[k];
    if (type === "string") out[k] = String(v ?? "").trim().slice(0, 4000);
    else if (type === "number") out[k] = Number(v) || 0;
    else if (type === "bool") out[k] = !!v;
    else if (type === "list") {
      const arr = Array.isArray(v) ? v : String(v ?? "").split("\n");
      out[k] = arr.map((x) => String(x).trim()).filter(Boolean).slice(0, 30);
    } else if (type.startsWith("enum:")) {
      if (type.slice(5).split(",").includes(v)) out[k] = v;
    }
  }
  return out;
}

export function crudCollection(Model, fields, required) {
  return async function POST(req) {
    const { error } = await guard("admin");
    if (error) return error;
    const data = pick(await readBody(req), fields);
    if (required.some((r) => !data[r] || (Array.isArray(data[r]) && !data[r].length))) {
      return fail(`${required.join(", ")} zaroori hai`);
    }
    return json({ item: await Model.create(data) }, 201);
  };
}

export function crudItem(Model, fields, required) {
  return {
    async PUT(req, { params }) {
      const { error } = await guard("admin");
      if (error) return error;
      const { id } = await params;
      if (!isId(id)) return fail("Invalid id");
      const data = pick(await readBody(req), fields);
      if (required.some((r) => r in data && !data[r])) return fail(`${required.join(", ")} khali nahi ho sakta`);
      const item = await Model.findByIdAndUpdate(id, { $set: data }, { new: true });
      if (!item) return fail("Nahi mila", 404);
      return json({ item });
    },
    async DELETE(_req, { params }) {
      const { error } = await guard("admin");
      if (error) return error;
      const { id } = await params;
      if (!isId(id)) return fail("Invalid id");
      await Model.findByIdAndDelete(id);
      return json({ ok: true });
    },
  };
}
