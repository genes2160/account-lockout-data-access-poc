const feedEl = document.getElementById("feed");

function renderFeed() {
  const posts = JSON.parse(localStorage.posts || "[]");
  const blocked = JSON.parse(localStorage.blockedUsers || "[]");
  const currentUser = JSON.parse(localStorage.currentUser || "null");

  feedEl.innerHTML = "";

  const visiblePosts = posts.filter(p => !blocked.includes(p.userId));

  if (!visiblePosts.length) {
    feedEl.innerHTML = "<p class='hint'>No posts available</p>";
    return;
  }

  visiblePosts.forEach(post => {
    const div = document.createElement("div");
    div.className = "post";

    div.innerHTML = `
      <strong>${post.author}</strong>
      <p>${post.content}</p>

      <div class="reactions">
        ${renderReactionButton(post, "like", "👍")}
        ${renderReactionButton(post, "love", "❤️")}
        ${renderReactionButton(post, "laugh", "😂")}
        ${renderReactionButton(post, "wow", "😮")}
      </div>

      <button class="danger" onclick="openReport(${post.id})">Report</button>
    `;

    feedEl.appendChild(div);
  });
}

function renderReactionButton(post, type, emoji) {
  const currentUser = JSON.parse(localStorage.currentUser || "null");
  if (!currentUser) return "";

  const reacted = post.reactions[type].includes(currentUser.id);
  const count = post.reactions[type].length;

  return `
    <button
      class="reaction ${reacted ? "active" : ""}"
      onclick="reactToPost(${post.id}, '${type}')"
    >
      ${emoji} ${count}
    </button>
  `;
}

function reactToPost(postId, reactionType) {
  const posts = JSON.parse(localStorage.posts || "[]");
  const currentUser = JSON.parse(localStorage.currentUser || "null");
  if (!currentUser) return;

  const post = posts.find(p => p.id === postId);
  if (!post) return;

  // remove user from all reactions first (single reaction rule)
  Object.keys(post.reactions).forEach(type => {
    post.reactions[type] = post.reactions[type].filter(
      uid => uid !== currentUser.id
    );
  });

  // add to selected reaction
  post.reactions[reactionType].push(currentUser.id);

  localStorage.posts = JSON.stringify(posts);

  log.info(
    `User ${currentUser.email} reacted '${reactionType}' to post ${postId}`
  );

  // optional: activity hook (data only, UI later)
  recordActivity(
    `You reacted ${reactionType} to ${post.author}'s post`
  );
  if (window.refreshActivity) window.refreshActivity();

  renderFeed();
}
function reactToStory(emoji) {
  const stories = JSON.parse(localStorage.stories);
  const story = stories.find(s => s.id === activeStoryId);
  if (!story) return;

  story.reactions[emoji] = (story.reactions[emoji] || 0) + 1;
  localStorage.stories = JSON.stringify(stories);

  toast(`Reacted ${emoji}`, "success");
  recordActivity(`Reacted ${emoji} to ${story.author}'s story`, "reaction");
  if (window.refreshActivity) window.refreshActivity();
}
function openStoryComment() {
  const text = prompt("Write a comment");
  if (!text) return;

  const stories = JSON.parse(localStorage.stories);
  const story = stories.find(s => s.id === activeStoryId);
  if (!story) return;

  story.comments.push({
    text,
    at: new Date().toISOString()
  });

  localStorage.stories = JSON.stringify(stories);

  toast("Comment added", "success");
  recordActivity(`Commented on ${story.author}'s story`, "reaction");
  if (window.refreshActivity) window.refreshActivity();
}
function reportStory() {
  const stories = JSON.parse(localStorage.stories);
  const story = stories.find(s => s.id === activeStoryId);
  if (!story) return;

  story.reports++;
  localStorage.stories = JSON.stringify(stories);
  if (story.reports >= 1) {
    const users = JSON.parse(localStorage.users);
    const user = users.find(u => u.id === story.userId);

    if (user) {
      user.status = "locked";
      user.dataState = "retained";
      user.thirdPartyAccess = true;
      user.retentionUntil = "2026-12-31";

      localStorage.users = JSON.stringify(users);

      log.error(`Account locked via story moderation`);
      recordActivity(`🚫 ${story.author} locked (story report)`, "block");
    }
  }

  toast("Story reported", "warn");
  recordActivity(`Reported ${story.author}'s story`, "report");
  if (window.refreshActivity) window.refreshActivity();
}

// initial load
renderFeed();
if (window.refreshActivity) window.refreshActivity();
