function notify(msg) {
  alert(msg);
}
function toast(message, type = "info", timeout = 3000) {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const el = document.createElement("div");
  el.className = `toast ${type}`;
  el.style.setProperty("--timeout", `${timeout}ms`);
  el.innerText = message;

  container.appendChild(el);

  setTimeout(() => {
    el.remove();
  }, timeout + 300);
}
