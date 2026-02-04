if (!localStorage.users) {
  localStorage.users = JSON.stringify([
    {
      id: 1,
      email: "userA@test.com",
      status: "active",
      dataState: "active",
      thirdPartyAccess: false
    },
    {
      id: 2,
      email: "userB@test.com",
      status: "active",
      dataState: "active",
      thirdPartyAccess: false
    }
  ]);
}


if (!localStorage.posts) {
  localStorage.posts = JSON.stringify([
    { id: 1, userId: 2, author: "Jane Smith", content: "Hello world 👋", reports: 0 },
    { id: 2, userId: 3, author: "Alex Brown", content: "Beautiful day outside!", reports: 0 },
    { id: 3, userId: 4, author: "Chris Lee", content: "Just finished a long run 🏃", reports: 0 },
    { id: 4, userId: 2, author: "Jane Smith", content: "Anyone working remotely today?", reports: 0 },
    { id: 5, userId: 5, author: "Sam Doe", content: "Coffee first. Always ☕", reports: 0 },
    { id: 6, userId: 3, author: "Alex Brown", content: "New blog post is live!", reports: 0 },
    { id: 7, userId: 6, author: "Nina Ray", content: "Mental health matters.", reports: 0 },
    { id: 8, userId: 4, author: "Chris Lee", content: "Who’s watching the game tonight?", reports: 0 },
    { id: 9, userId: 7, author: "Paul Young", content: "Trying out a new recipe 🍝", reports: 0 },
    { id: 10, userId: 2, author: "Jane Smith", content: "Good vibes only ✨", reports: 0 }
  ]);
}

if (!localStorage.blockedUsers) {
  localStorage.blockedUsers = JSON.stringify([]);
}


setTimeout(() => {
  const users = JSON.parse(localStorage.users);
  users.forEach(u => {
    if (u.status === "locked" && u.dataState === "retained") {
      log.info(`Background job: processing data for ${u.email}`);
    }
  });
}, 3000);
