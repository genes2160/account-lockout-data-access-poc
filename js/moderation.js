let pendingBlockUserName = null;

function report(postId) {
  const posts = JSON.parse(localStorage.posts);
  const users = JSON.parse(localStorage.users);

  const post = posts.find(p => p.id === postId);
  post.reports++;

  if (post.reports >= 1) {
    const user = users.find(u => u.id === post.userId);

    user.status = "locked";
    user.dataState = "retained";
    user.thirdPartyAccess = true;
    user.retentionUntil = "2026-12-31";

    log.error("Account locked");
    log.info("Data state → retained");
    log.info("Third-party processing enabled");
    log.info("Retention until 2026-12-31");
  }

  localStorage.posts = JSON.stringify(posts);
  localStorage.users = JSON.stringify(users);
  toast("User reported. Enforcement applied.", "warn");
}
let reportingPostId = null;
let pendingBlockUserId = null;

// open report modal
function openReport(postId) {
  reportingPostId = postId;
  document.getElementById("reportModal").classList.remove("hidden");
}

// close report modal
function closeReport() {
  document.getElementById("reportModal").classList.add("hidden");
}

// submit report reason
function submitReport() {
  closeReport();

  const posts = JSON.parse(localStorage.posts || "[]");
  const post = posts.find(p => p.id === reportingPostId);

  if (!post) {
    toast("Unable to report post", "error");
    return;
  }
  pendingBlockUserId = post.userId;
  pendingBlockUserName = post.author;
// Find and update the current user if it's the one being blocked
  const currentUser = JSON.parse(localStorage.users || "[]").find(u => u.id === pendingBlockUserId) || null;
  if (currentUser && currentUser.id === pendingBlockUserId) {
    currentUser.status = "locked";
    localStorage.users = JSON.stringify(
      JSON.parse(localStorage.users || "[]").map(u => u.id === pendingBlockUserId ? currentUser : u)
    );
  }
  toast("Report submitted", "success");
  log.warn(`Post ${post.id} reported`);
  recordActivity(`You reported ${post.author}'s post`);
  if (window.refreshActivity) window.refreshActivity();
  // show block modal
  document.getElementById("blockModal").classList.remove("hidden");
}

// confirm block
function confirmBlock() {
  const blocked = JSON.parse(localStorage.blockedUsers || "[]");

  if (!blocked.includes(pendingBlockUserId)) {
    blocked.push(pendingBlockUserId);
    localStorage.blockedUsers = JSON.stringify(blocked);
  }
  toast("User blocked. Their posts are now hidden.", "info");
  log.info(`User ${pendingBlockUserId} blocked`);
  recordActivity(`You blocked ${pendingBlockUserName}`, "block");
  if (window.refreshActivity) window.refreshActivity();

  cleanupAfterModeration();
  renderFeed(); // ✅ immediate UI update
}

// cancel block
function cancelBlock() {
  toast("User not blocked", "info");
  cleanupAfterModeration();
}

// cleanup
function cleanupAfterModeration() {
  reportingPostId = null;
  pendingBlockUserId = null;
  pendingBlockUserName = null;
  document.getElementById("blockModal").classList.add("hidden");
}
