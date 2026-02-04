let storyDB;
const MAX_VIDEO_SIZE = 10 * 1024 * 1024; // 10MB

const req = indexedDB.open("storyDB", 1);

req.onupgradeneeded = e => {
  storyDB = e.target.result;
  storyDB.createObjectStore("videos", { keyPath: "id" });
};

req.onsuccess = e => {
  storyDB = e.target.result;
};
function submitStory() {
  const user = JSON.parse(localStorage.currentUser);
  const type = document.getElementById("storyType").value;

  if (type === "text") {
    const text = document.getElementById("storyText").value;
    if (!text) return toast("Story is empty", "error");

    saveStory({
      type: "text",
      content: text
    });
  }

  if (type === "video") {
    const file = document.getElementById("storyVideo").files[0];
    if (!file) return toast("No video selected", "error");
    if (file.size > MAX_VIDEO_SIZE)
      return toast("Video too large (10MB max)", "error");

    const id = crypto.randomUUID();

    const tx = storyDB.transaction("videos", "readwrite");
    tx.objectStore("videos").add({ id, blob: file });

    saveStory({
      type: "video",
      content: id
    });
  }
}
function saveStory({ type, content }) {
  const stories = JSON.parse(localStorage.stories || "[]");
  const user = JSON.parse(localStorage.currentUser);

  stories.unshift({
    id: Date.now(),
    userId: user.id,
    author: user.email,
    type,
    content,
    createdAt: new Date().toISOString(),
    reactions: {},
    comments: [],
    reports: 0
  });

  localStorage.stories = JSON.stringify(stories);

  recordActivity(`📸 Story posted`, "info");
  closeAddStory();
    renderStories();
    
  if (window.refreshActivity) window.refreshActivity();
}
function openAddStory() {
  const modal = document.getElementById("addStoryModal");
  if (!modal) {
    log.error("AddStory modal not found");
    return;
  }

  // reset fields
  document.getElementById("storyText").value = "";
  document.getElementById("storyVideo").value = "";
  document.getElementById("storyType").value = "text";

  modal.classList.remove("hidden");
}
function closeAddStory() {
  const modal = document.getElementById("addStoryModal");
  if (!modal) return;

  modal.classList.add("hidden");
}
document.getElementById("storyType").addEventListener("change", e => {
  const isText = e.target.value === "text";
  document.getElementById("storyText").style.display = isText ? "block" : "none";
  document.getElementById("storyVideo").style.display = isText ? "none" : "block";
});
