const data = JSON.parse(localStorage.googleSimUser || "{}");

document.getElementById("identity").innerText =
  `${data.name} (${data.email})`;

function allow() {
  log.info("OAuth consent granted");

  const users = JSON.parse(localStorage.users || "[]");

  let user = users.find(u => u.email === data.email);

  if (!user) {
    user = {
      id: Date.now(),
      email: data.email,
      status: "active",
      dataState: "active",
      thirdPartyAccess: false
    };
    users.push(user);
    localStorage.users = JSON.stringify(users);
  }

  localStorage.currentUser = JSON.stringify(user);
  localStorage.removeItem("googleSimUser");

  location.href = "dashboard.html";
}

function cancel() {
  log.warn("OAuth consent cancelled");
  localStorage.removeItem("googleSimUser");
  location.href = "index.html";
}
