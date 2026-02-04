function login() {
  const email = document.getElementById("email").value;
  const users = JSON.parse(localStorage.users);

  const user = users.find(u => u.email === email);

  if (!user) return alert("User not found");

  if (user.status === "locked") {
    log.error("Login denied: account locked");
    location.href = "locked.html";
  } else {
    localStorage.currentUser = JSON.stringify(user);
    log.info("Login success");
    location.href = "dashboard.html";
  }
}
