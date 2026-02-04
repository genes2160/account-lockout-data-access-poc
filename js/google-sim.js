function selectAccount(name, email) {
  log.info(`Google account selected: ${email}`);

  // Store temporary OAuth-like payload
  localStorage.googleSimUser = JSON.stringify({
    name,
    email
  });

  location.href = "google-consent.html";
}
