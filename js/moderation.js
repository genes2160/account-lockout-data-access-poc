function report(postId) {
  const posts = JSON.parse(localStorage.posts);
  const users = JSON.parse(localStorage.users);

  const post = posts.find(p => p.id === postId);
  post.reports++;

  if (post.reports >= 1) {
    const user = users.find(u => u.id === post.userId);
    user.status = "locked";
    log.error("Account locked due to report");
  }

  localStorage.posts = JSON.stringify(posts);
  localStorage.users = JSON.stringify(users);
  alert("User reported");
}
