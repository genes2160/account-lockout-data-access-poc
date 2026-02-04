const feedEl = document.getElementById("feed");

function renderFeed() {
  const posts = JSON.parse(localStorage.posts || "[]");
  const blocked = JSON.parse(localStorage.blockedUsers || "[]");

  feedEl.innerHTML = "";

  const visiblePosts = posts.filter(p => !blocked.includes(p.userId));

  if (!visiblePosts.length) {
    feedEl.innerHTML = "<p class='hint'>No posts available</p>";
    return;
  }

  visiblePosts.forEach(post => {
    const div = document.createElement("div");
    div.className = "post";

    div.innerHTML = `
      <strong>${post.author}</strong>
      <p>${post.content}</p>
      <button class="danger" onclick="openReport(${post.id})">Report</button>
    `;

    feedEl.appendChild(div);
  });
}

// initial load
renderFeed();
