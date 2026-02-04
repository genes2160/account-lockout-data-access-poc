function attemptExport() {
  log.warn("Data export requested");

  document.getElementById("message").innerText =
    "❌ Data export unavailable for locked accounts.";
}
