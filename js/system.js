const users = JSON.parse(localStorage.users || "[]");
const tbody = document.getElementById("rows");

users.forEach(u => {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${u.email}</td>
    <td>${u.status}</td>
    <td>${u.dataState || "active"}</td>
    <td>${u.thirdPartyAccess ? "YES" : "NO"}</td>
    <td>${u.retentionUntil || "-"}</td>
  `;
  tbody.appendChild(tr);
});
