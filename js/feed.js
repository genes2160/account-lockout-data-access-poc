const feed = document.getElementById("feed");
const posts = JSON.parse(localStorage.posts);

posts.forEach(post => {
  const div = document.createElement("div");
  div.className = "post";
  div.innerHTML = `
    <p>${post.content}</p>
    <button onclick="report(${post.id})">Report</button>
  `;
  feed.appendChild(div);
});
