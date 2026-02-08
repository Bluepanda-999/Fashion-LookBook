const API = "http://localhost:5000/api";

function getToken() {
  return localStorage.getItem("token");
}

async function loadHotTopics() {
  const res = await fetch(`${API}/topics/hot`);
  const data = await res.json();
  const el = document.getElementById("hot-topics");
  if (!el) return;
  el.innerHTML = data.topics?.map(t => `<a href="#" class="topic">${t.title}</a>`).join("") || "";
}

async function loadPopularPosts() {
  const token = getToken();
  if (!token) return;

  const res = await fetch(`${API}/posts?sort=popular&limit=6`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();

  const grid = document.getElementById("popular-grid");
  if (!grid) return;

  grid.innerHTML = (data.posts || []).map(p => `
    <div class="card">
      ${p.image ? `<img src="${p.image}" alt="" />` : ""}
      <h3>${p.title}</h3>
      <p>${p.description.slice(0,120)}...</p>
      <small>${p.style} • ${p.season}</small>
    </div>
  `).join("");
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadHotTopics();
  await loadPopularPosts();
});
