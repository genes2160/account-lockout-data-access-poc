if (!localStorage.users) {
  localStorage.users = JSON.stringify([
    { id: 1, email: "userA@test.com", status: "active" },
    { id: 2, email: "userB@test.com", status: "active" }
  ]);
}

if (!localStorage.posts) {
  localStorage.posts = JSON.stringify([
    { id: 1, userId: 2, content: "Hello world", reports: 0 }
  ]);
}
