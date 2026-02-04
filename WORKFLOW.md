## 🎯 POC GOAL (Very Clear)

Demonstrate — **without any backend** — how:

* users can be **reported**
* accounts can be **locked**
* access can be **fully denied**
* **data export is blocked**
* yet **user data still exists in the system**

This visually illustrates the **gap between enforcement and data rights**.

---

## 🧠 Core Principles

* ❌ No backend
* ❌ No auth server
* ❌ No APIs
* ✅ Pure **HTML + CSS + JS**
* ✅ `localStorage` as the “system of record”
* ✅ Clear logs, notifications, and UX states
* ✅ Mobile-first, clean UI

---

## 👥 Actors (Hardcoded, Simple)

### User A – Normal user

* Can post
* Can like
* Can report another user

### User B – Target user

* Posts content
* Gets reported
* Gets banned
* Loses login access
* Cannot export data

---

## 🗂 Suggested File Structure

```
/social-lockout-poc
│
├── index.html          # login / register
├── dashboard.html      # social feed
├── locked.html         # banned account screen
│
├── css/
│   └── app.css
│
├── js/
│   ├── storage.js      # localStorage wrapper
│   ├── auth.js         # simulated auth
│   ├── feed.js         # posts, likes, reports
│   ├── moderation.js  # report + ban logic
│   ├── export.js       # data export attempt
│   ├── notifications.js
│   └── logger.js
│
└── README.md
```

---

## 🔐 Login / Register (Simulated)

**index.html**

* Centered login/register card
* Email + password (fake)
* “Login with Google” button (simulated)

```js
localStorage.users = [
  { id: 1, email: "userA@test.com", status: "active" },
  { id: 2, email: "userB@test.com", status: "active" }
];
```

On login:

* If `status === "locked"` → redirect to `locked.html`
* Else → `dashboard.html`

---

## 📰 Dashboard (Social Media App)

### Features

* Feed (posts from both users)
* Like button
* Share (fake)
* Report button

### UI Sections

* Top nav (logo, notifications bell)
* Feed cards
* Floating “Create Post” button

---

## 🚨 Reporting Flow

**User A reports User B**

```js
reportUser(userId, reason);
```

What happens:

* Report stored in `localStorage.reports`
* Notification shown
* Threshold reached (e.g. 1 report)
* User B status → `"locked"`

Extensive logs:

```js
log.info("Report submitted");
log.warn("Account flagged");
log.error("Account locked");
```

---

## 🚫 Locked Account Experience

**locked.html**

When User B tries to login:

* Full-screen “Account Locked” screen
* Reason shown (generic)
* CTA buttons:

  * “Learn more”
  * “Export my data”

---

## 📦 Data Export Attempt (Key Part)

User clicks **Export My Data**

What happens:

* Spinner
* Notification:
  ❌ “Data export unavailable for locked accounts”

But internally:

```js
localStorage.userData still exists
```

Show:

* ❌ Access denied
* ❌ No download
* ❌ No preview

This is the **core illustration**.

---

## 🔔 Notification System (Very Important)

Reusable notification component:

* success (green)
* info (blue)
* warning (orange)
* error (red)

Auto-dismiss after X seconds.

```js
notify("Account locked", "error");
```

---

## 🧾 Logging System (Console + UI)

Every action logs:

* timestamp
* level
* message

Example:

```
[INFO] User logged in
[WARN] Report submitted
[ERROR] Account access denied
```

Optionally show logs in a collapsible panel.

---

## 📱 Mobile Compatibility

* Flexbox / CSS Grid
* Max-width feed cards
* Touch-friendly buttons
* No hover dependencies

---

## 📘 README (Important)

Explain:

* What the POC demonstrates
* Why localStorage is used
* What happens to data after lock
* Why export is denied
* How this maps to real-world platforms

---

## 🔜 Next Version (You already hinted)

> “then next version we explore what and how their data can be sold since not accessed”

That would be:

* Silent data access
* “Third-party processing”
* No user visibility
* Monetization simulation

⚠️ Ethically sensitive — but powerful if framed as **illustration**, not endorsement.

---

## ✅ Summary

This POC is:
* coherent
* demonstrative
* easy to reason about
* technically simple
* politically neutral
* very effective


# 🚧 v0.2.0 — *Post-Lock Data Lifecycle Simulation*

## 🎯 Objective (Very Explicit)

Extend the POC to **demonstrate what *can* happen to user data after lockout**, when:

* the user has **no access**
* data **still exists**
* processing continues **outside user visibility**

This version **does not promote misuse** — it **illustrates opacity**.

---

## 🧠 Core Concept

> **Loss of access ≠ loss of data**

v0.2.0 simulates:

* background data processing
* third-party access flags
* monetization indicators
* retention timelines
* zero user visibility

All clearly labeled as **simulation**.

---

## 🆕 New Concepts Introduced

### 1️⃣ Data Lifecycle States

Each user gets a lifecycle state:

```js
dataState: "active" | "restricted" | "retained" | "shared" | "deleted"
```

* `active` → normal user
* `restricted` → account locked
* `retained` → data held for internal reasons
* `shared` → simulated third-party processing
* `deleted` → data erased

---

### 2️⃣ Silent Background Processing (Simulated)

When user is locked:

* No UI change for the user
* Internal logs show processing

```js
log.info("Background job: user data retained");
log.info("Background job: analytics access enabled");
```

This reinforces:

> *Processing can continue even when access is denied.*

---

### 3️⃣ “Third-Party Access” Simulation

Add a **system-only flag**:

```js
thirdPartyAccess: true
```

Examples shown only in logs / admin panel:

* “Ad analytics”
* “Safety review”
* “Research dataset”
* “Aggregated insights”

⚠️ No real data leaves the browser.

---

### 4️⃣ Retention Timer (Visual but Inaccessible)

Simulate retention duration:

```js
retentionUntil: "2026-12-31"
```

User **cannot see this**.
Only visible in:

* logs
* internal “system view”

This highlights **asymmetry of information**.

---

### 5️⃣ Internal System View (Read-Only)

Add a **hidden system dashboard** (`system.html`):

* shows all users
* shows data states
* shows access flags
* shows retention timers

This page:

* is not linked
* simulates internal tooling
* contrasts sharply with locked user experience

---

## 🖥 New Screens (v0.2.0)

### 🔒 Locked User (unchanged UX)

* Still cannot export data
* Still no visibility
* Still sees “access denied”

### ⚙️ System View (new)

* Full data visibility
* Full lifecycle states
* Full processing flags

This contrast is the **core message**.

---

## 🧾 Logging (Expanded)

Add **structured logs**:

```
[INFO] Account locked
[INFO] Data state → retained
[INFO] Third-party processing enabled
[INFO] Retention until 2026-12-31
```

Optionally render logs in a collapsible UI panel.

---

## 🧠 Ethical Guardrails (Important)

Include explicit labels:

* “Simulation”
* “Illustrative”
* “No real data shared”
* “Demonstration of visibility gaps”

Add to README + UI footer.

---

## 📘 README Additions (v0.2.0)

New sections:

* Data lifecycle after lockout
* Visibility vs processing
* Why lack of access ≠ lack of use
* Mapping to GDPR concepts (without accusing)

---

## 🔜 v0.3.0 (Optional, Later)

If you choose:

* Data deletion proof UX
* Erasure verification receipts
* Post-lock data summary screen
* “What good looks like” reference model

---

## ✅ Why v0.2.0 Works

* Neutral
* Educational
* Technically simple
* Ethically framed
* Powerful contrast
* Supports your LinkedIn / GDPR discussion perfectly

