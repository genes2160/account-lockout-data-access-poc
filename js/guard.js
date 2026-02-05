(function authGuard() {
  try {
    const userRaw = localStorage.currentUser;
    const path = location.pathname;
    const isIndex =
      path === "/" || path.endsWith("index.html");
    const isLockedPage = path.endsWith("locked.html");
      // Add this right after parsing
      console.log("[GUARD] Parsed user status:", userRaw?.status);  // ← debug gold

    if (userRaw && userRaw.status && userRaw.status === "locked" && !isLockedPage) {
      console.warn("[GUARD] Locked user detected — redirecting to locked.html");
      location.replace("locked.html");
      return;  // ensure nothing else runs
    }
    // ✅ Logged IN user on index → dashboard
    if (userRaw && isIndex) {
      console.info("[GUARD] Authenticated user on index → dashboard");
      location.replace("dashboard.html");
      return;
    }

    // ❌ Logged OUT user on protected page → index
    if (!userRaw && !isIndex) {
      console.warn("[GUARD] No session → redirect to index", userRaw, isIndex);
      location.replace("index.html");
      return;
    }

    // ✅ If logged out AND already on index → DO NOTHING
    if (!userRaw && isIndex) {
      return;
    }

    const user = JSON.parse(userRaw);

    // ❌ Corrupt session → reset + index
    if (!user || !user.email || !user.status) {
      console.warn("[GUARD] Invalid session → reset");
      localStorage.removeItem("currentUser");
      if (!isIndex) location.replace("index.html");
      return;
    }

    // 🔒 Locked user enforcement
    if (user.status === "locked" && !isLockedPage) {
      console.warn("[GUARD] Locked user → locked.html");
      location.replace("locked.html");
    }

  } catch (e) {
    console.error("[GUARD] Fatal error:", e);
    localStorage.clear();
    if (!location.pathname.endsWith("index.html")) {
      location.replace("index.html");
    }
  }
})();
