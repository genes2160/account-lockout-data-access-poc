let activeStoryId = null;
let activeStoryIndex = 0;
let activeStories = [];

const STORY_TTL = 24 * 60 * 60 * 1000;
function renderStories() {
  const list = document.getElementById("storiesList");
  if (!list) return;

  const stories = JSON.parse(localStorage.stories || "[]");
  list.innerHTML = "";

  stories.forEach(s => {
    const li = document.createElement("li");
    li.innerText = `${s.author}'s story`;
    li.onclick = () => openStory(s.id);
    list.appendChild(li);
  });
}

function openStory(id) {
    const stories = JSON.parse(localStorage.stories || "[]");
    const story = stories.find(s => s.id === id);
    if (!story) return;
    activeStories = getActiveStories();
    activeStoryIndex = activeStories.findIndex(s => s.id === id);

    activeStoryId = id;

    document.getElementById("storyAuthor").innerText = story.author;

    const content = document.getElementById("storyContent");
    content.innerHTML = "";

    if (story.type === "text") {
        content.innerHTML = `<p>${story.content}</p>`;
    } else {
        content.innerHTML = `
        <video controls playsinline style="width:100%">
            <source src="${story.content}" />
        </video>
        `;
    }

    document.getElementById("storyModal").classList.remove("hidden");

    recordActivity(`Viewed ${story.author}'s story`, "info");
    if (window.refreshActivity) window.refreshActivity();
}

function isStoryExpired(story) {
  return Date.now() - new Date(story.createdAt).getTime() > STORY_TTL;
}

function getActiveStories() {
  const stories = JSON.parse(localStorage.stories || "[]");
  return stories.filter(s => !isStoryExpired(s));
}

function closeStory() {
  activeStoryId = null;
  document.getElementById("storyModal").classList.add("hidden");
}
setInterval(() => {
  const stories = JSON.parse(localStorage.stories || "[]");
  stories.forEach(s => {
    if (isStoryExpired(s)) {
      log.info(`Story ${s.id} expired but retained`);
    }
  });
}, 60000);
let touchStartX = 0;

const modal = document.getElementById("storyModal");

modal.addEventListener("touchstart", e => {
  touchStartX = e.touches[0].clientX;
});

modal.addEventListener("touchend", e => {
  const diff = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(diff) < 50) return;

  if (diff < 0) nextStory();
  else prevStory();
});

function nextStory() {
  if (activeStoryIndex < activeStories.length - 1) {
    openStory(activeStories[++activeStoryIndex].id);
  }
}

function prevStory() {
  if (activeStoryIndex > 0) {
    openStory(activeStories[--activeStoryIndex].id);
  }
}

renderStories()