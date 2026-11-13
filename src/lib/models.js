import mongoose from "mongoose";

const { Schema } = mongoose;

// Har document JSON mein `id` ke saath jaata hai (frontend ke liye), passwordHash kabhi nahi.
const opts = {
  timestamps: true,
  toJSON: {
    versionKey: false,
    transform: (_doc, ret) => {
      ret.id = String(ret._id);
      delete ret._id;
      delete ret.passwordHash;
      delete ret.tokenVersion;
      return ret;
    },
  },
};

const model = (name, schema) => mongoose.models[name] || mongoose.model(name, schema);

/* ---------- WEBSITE ---------- */
export const GalleryItem = model(
  "GalleryItem",
  new Schema(
    {
      title: { type: String, required: true, trim: true },
      category: { type: String, default: "AI Automation" },
      description: { type: String, default: "" },
      image: { type: String, required: true },
    },
    opts
  )
);

export const Review = model(
  "Review",
  new Schema(
    {
      name: { type: String, required: true, trim: true },
      email: { type: String, required: true, trim: true },
      rating: { type: Number, min: 1, max: 5, default: 5 },
      service: { type: String, default: "" },
      comment: { type: String, required: true },
      featured: { type: Boolean, default: false },
      date: { type: String, default: "" },
    },
    opts
  )
);

export const Enquiry = model(
  "Enquiry",
  new Schema(
    {
      name: { type: String, required: true, trim: true },
      contact: { type: String, required: true, trim: true },
      service: { type: String, default: "" },
      message: { type: String, required: true },
      date: { type: String, default: "" },
    },
    opts
  )
);

// Owner / company details (sirf ek document, key = "owner")
export const Setting = model(
  "Setting",
  new Schema({ key: { type: String, unique: true }, value: Schema.Types.Mixed }, opts)
);

/* ---------- TEAM WORK ---------- */
export const User = model(
  "User",
  new Schema(
    {
      username: { type: String, required: true, unique: true, lowercase: true, trim: true },
      name: { type: String, required: true, trim: true },
      passwordHash: { type: String, required: true },
      role: { type: String, enum: ["admin", "employee"], default: "employee" },
      githubUsername: { type: String, default: "", trim: true },
      designation: { type: String, default: "" },
      active: { type: Boolean, default: true },
      mustChangePassword: { type: Boolean, default: false },
      tokenVersion: { type: Number, default: 0 },
    },
    opts
  )
);

export const Project = model(
  "Project",
  new Schema(
    {
      name: { type: String, required: true, trim: true },
      description: { type: String, default: "" },
      repo: { type: String, default: "", lowercase: true, trim: true }, // "owner/name"
      status: { type: String, enum: ["active", "paused", "completed"], default: "active" },
      deadline: { type: Date, default: null },
      members: [{ type: Schema.Types.ObjectId, ref: "User" }],
      createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    },
    opts
  )
);

export const Task = model(
  "Task",
  new Schema(
    {
      project: { type: Schema.Types.ObjectId, ref: "Project", required: true, index: true },
      title: { type: String, required: true, trim: true },
      description: { type: String, default: "" },
      assignee: { type: Schema.Types.ObjectId, ref: "User", default: null },
      status: { type: String, enum: ["todo", "in_progress", "review", "done"], default: "todo" },
      priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
      dueDate: { type: Date, default: null },
    },
    opts
  )
);

// Daily updates / comments / system activity
export const Update = model(
  "Update",
  new Schema(
    {
      project: { type: Schema.Types.ObjectId, ref: "Project", required: true, index: true },
      author: { type: Schema.Types.ObjectId, ref: "User", required: true },
      text: { type: String, required: true },
      kind: { type: String, enum: ["note", "system"], default: "note" },
    },
    opts
  )
);

// GitHub commits (webhook ya Sync button se aate hain)
const commitSchema = new Schema(
  {
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    sha: { type: String, required: true },
    message: { type: String, default: "" },
    authorLogin: { type: String, default: "" },
    authorName: { type: String, default: "" },
    authorEmail: { type: String, default: "" },
    branch: { type: String, default: "" },
    url: { type: String, default: "" },
    date: { type: Date, default: Date.now },
  },
  opts
);
commitSchema.index({ project: 1, sha: 1 }, { unique: true });
export const Commit = model("Commit", commitSchema);
