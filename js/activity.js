const activityEl = document.getElementById("activityList");
const emptyEl = document.getElementById("activityEmpty");

function iconFor(type) {
  switch (type) {
    case "reaction": return "👍";
    case "report": return "🚩";
    case "block": return "🚫";
    default: return "ℹ️";
  }
}

function renderActivity() {
  if (!activityEl) return;

  const activities = JSON.parse(localStorage.activities || "[]");

  activityEl.innerHTML = "";

  if (!activities.length) {
    if (emptyEl) emptyEl.style.display = "block";
    return;
  }

  if (emptyEl) emptyEl.style.display = "none";

  activities.slice(0, 15).forEach(a => {
    const row = document.createElement("div");
    row.className = "activity-item";
    // row.innerHTML = `
    //   <div class="activity-msg">${escapeHtml(a.message || "")}</div>
    //   <div class="activity-ts">${formatTs(a.ts)}</div>
    // `;
      row.innerHTML = `
        <div class="activity-msg">
            <span class="activity-icon">${iconFor(a.type)}</span>
            ${escapeHtml(a.message || "")}
        </div>
        <div class="activity-ts">${formatTs(a.ts)}</div>
    `;

    activityEl.appendChild(row);
  });
}

// small utilities (no dependencies)
function oldFormatTs(iso) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch (e) {
    return "";
  }
}
function formatTs(iso) {
  if (!iso) return "";

  try {
  const diff = Math.floor((Date.now() - new Date(iso)) / 1000);

  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;

  return `${Math.floor(diff / 86400)}d ago`;
  } catch (e) {
    return "";
  }
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// ✅ optional hook: allow other files to refresh activity UI
window.refreshActivity = renderActivity;

document.addEventListener("DOMContentLoaded", renderActivity);
