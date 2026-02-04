function login() {
  const email = document.getElementById("email").value;
  const users = JSON.parse(localStorage.users);

  const user = users.find(u => u.email === email);


  if (!user) {
    toast("User not found", "error");
    log.warn("Login failed: user not found");
    return;
  }
  if (user.status === "locked") {
    toast("Account is locked", "error");
    log.error("Login denied: account locked");
    location.href = "locked.html";
    return;
  } else {
    localStorage.currentUser = JSON.stringify(user);
    toast("Login successful", "success");
    log.info("Login success");
    location.href = "dashboard.html";
  }
}
function hydrateNavbar() {
  const user = JSON.parse(localStorage.currentUser || "null");
  if (!user) return;

  document.getElementById("userEmail").innerText = user.email;

  const statusEl = document.getElementById("userStatus");
  statusEl.innerText = user.status;
  statusEl.classList.add(user.status === "locked" ? "locked" : "active");
}

function logout() {
  log.info("User logged out");
  localStorage.removeItem("currentUser");
  location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", hydrateNavbar);
