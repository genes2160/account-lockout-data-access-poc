function renderUsers() {
  const users = JSON.parse(localStorage.users || "[]");
  const tbody = document.getElementById("rows");
  tbody.innerHTML = "";

  users.forEach(u => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>
        <input type="checkbox" class="user-select" value="${u.id}" />
      </td>
      <td>${u.email}</td>
      <td>${u.status}</td>
      <td>${u.dataState || "active"}</td>
      <td>${u.thirdPartyAccess ? "Yes" : "No"}</td>
      <td>${u.retentionUntil || "-"}</td>
    `;
    tbody.appendChild(tr);
  });

  wireSelectAll();
}
function wireSelectAll() {
  const master = document.getElementById("selectAllUsers");
  if (!master) return;

  master.onchange = () => {
    document
      .querySelectorAll(".user-select")
      .forEach(cb => (cb.checked = master.checked));
  };
}

function exportSelected() {
  const selectedUserIds = [...document.querySelectorAll(".user-select:checked")]
    .map(cb => Number(cb.value));

  if (!selectedUserIds.length) {
    toast("Select at least one user to export", "warn");
    return;
  }

  const include = [...document.querySelectorAll(".export-controls input:checked")]
    .map(i => i.value);

  const payload = {};

  // USERS
  if (include.includes("users")) {
    payload.users = JSON.parse(localStorage.users || "[]")
      .filter(u => selectedUserIds.includes(u.id));
  }

  // POSTS
  if (include.includes("posts")) {
    payload.posts = JSON.parse(localStorage.posts || "[]")
      .filter(p => selectedUserIds.includes(p.userId));
  }

  // STORIES
  if (include.includes("stories")) {
    payload.stories = JSON.parse(localStorage.stories || "[]")
      .filter(s => selectedUserIds.includes(s.userId));
  }

  // ACTIVITIES (text-based association)
  if (include.includes("activities")) {
    payload.activities = JSON.parse(localStorage.activities || "[]")
      .filter(a =>
        selectedUserIds.some(id => a.message?.includes(`user ${id}`))
      );
  }

  // BLOCKED USERS
  if (include.includes("blockedUsers")) {
    payload.blockedUsers = JSON.parse(localStorage.blockedUsers || "[]")
      .filter(id => selectedUserIds.includes(id));
  }

  downloadJSON(payload);
}
function downloadJSON(data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json"
  });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `system-export-${Date.now()}.json`;
  a.click();

  toast("Export generated", "success");
  log.info("User-scoped export completed");
}


renderUsers();
