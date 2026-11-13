const API = "https://api.github.com";

function headers() {
  const h = { Accept: "application/vnd.github+json", "User-Agent": "nexworktech-team-panel" };
  if (process.env.GITHUB_TOKEN) h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return h;
}

export async function fetchRepoCommits(repo, perPage = 50) {
  const res = await fetch(`${API}/repos/${repo}/commits?per_page=${perPage}`, { headers: headers(), cache: "no-store" });
  if (res.status === 404) throw new Error("Repo nahi mila. Private repo hai toh GITHUB_TOKEN set karein.");
  if (res.status === 403 || res.status === 401) throw new Error("GitHub ne access mana kiya (token/rate limit check karein).");
  if (!res.ok) throw new Error(`GitHub error ${res.status}`);
  const list = await res.json();
  return list.map((c) => ({
    sha: c.sha,
    message: c.commit?.message || "",
    authorLogin: (c.author?.login || "").toLowerCase(),
    authorName: c.commit?.author?.name || "",
    authorEmail: c.commit?.author?.email || "",
    date: c.commit?.author?.date ? new Date(c.commit.author.date) : new Date(),
    url: c.html_url || "",
  }));
}

export async function fetchBranches(repo) {
  const res = await fetch(`${API}/repos/${repo}/branches?per_page=30`, { headers: headers(), cache: "no-store" });
  if (!res.ok) return [];
  return (await res.json()).map((b) => b.name);
}
