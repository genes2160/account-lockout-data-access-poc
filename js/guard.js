(function authGuard() {
  try {
    const userRaw = localStorage.currentUser;

    // localStorage cleared or user missing
    if (!userRaw) {
      console.warn("[GUARD] No authenticated user found. Redirecting.");
      location.replace("index.html");
      return;
    }

    const user = JSON.parse(userRaw);

    // corrupted or invalid user object
    if (!user || !user.email || !user.status) {
      console.warn("[GUARD] Invalid user session. Redirecting.");
      localStorage.removeItem("currentUser");
      location.replace("index.html");
      return;
    }

    // OPTIONAL: lock enforcement
    if (user.status === "locked" && !location.pathname.includes("locked.html")) {
      console.warn("[GUARD] Locked user redirected.");
      location.replace("locked.html");
    }

  } catch (e) {
    console.error("[GUARD] Session check failed:", e);
    localStorage.clear();
    location.replace("index.html");
  }
})();
