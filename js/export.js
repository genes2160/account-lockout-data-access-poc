function attemptExport() {
  log.warn("Export requested by locked user");
  toast("Data export unavailable for locked accounts.", "error");
  document.getElementById("message").innerText =
    "❌ Data export unavailable while account is permanently restricted.";
}
