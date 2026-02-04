# 🧪 Social Lockout POC — Refined Workflow

## 🎯 POC GOAL (Crystal Clear)

Demonstrate — **using only frontend code** — how:

* users can be **reported**
* accounts can be **locked**
* access can be **fully denied**
* **data export is blocked**
* yet **user data continues to exist and be processed internally**

This POC visually exposes the **disconnect between user access and data lifecycle**.

> **Core thesis:**
> *Loss of access does not automatically imply loss of data.*

---

## 🧠 Design Principles
* ❌ No backend
* ❌ No real authentication
* ❌ No APIs
* ✅ Pure **HTML + CSS + JavaScript**
* ✅ `localStorage` = system of record
* ✅ Explicit UX states + notifications
* ✅ Structured logs for traceability
* ✅ Mobile-first, accessible UI
* ✅ Everything clearly labeled **SIMULATION**

---

## 👥 Actors (Intentionally Minimal)

### 🧑 User A — Reporting User
* Can log in
* Can browse feed
* Can report content

### 🧑 User B — Reported User
* Posts content
* Gets reported
* Account is locked
* Loses access entirely
* Cannot export data
* Has **no visibility** into data lifecycle

> No admins, no moderators — enforcement is **system-driven**.

---

## 🗂 File Structure (Lean but Complete)

```
/social-lockout-poc
│
├── index.html          # Login (simulated)
├── dashboard.html      # Feed + interactions
├── locked.html         # Post-lock experience
├── system.html         # Internal-only system view (hidden)
│
├── css/
│   ├── app.css         # Global + mobile-first styles
│   ├── dashboard.css
│   └── locked.css
│
├── js/
│   ├── guard.js        # Route protection + redirect logic
│   ├── storage.js     # localStorage initialization + helpers
│   ├── auth.js        # Simulated login/logout
│   ├── feed.js        # Feed rendering
│   ├── moderation.js  # Report → lock → block flow
│   ├── export.js      # Data export denial
│   ├── notification.js# Toast system
│   ├── logger.js      # Structured logging
│   └── system.js      # Internal system dashboard
│
└── .gitignore
│
│
└── WORKFLOW.md
│
└── README.md
```

---

## 🔐 Authentication (Simulated)

### index.html

* Email + password (fake)
* “Login with Google” (visual OAuth simulation)

```js
users = [
  { id: 1, email: "userA@test.com", status: "active" },
  { id: 2, email: "userB@test.com", status: "active" }
];
```

### Login Rules

* `status === "active"` → dashboard
* `status === "locked"` → locked screen
* No session → index
* Logged-in user on index → redirect to dashboard

Handled centrally by `guard.js`.

---

## 📰 Dashboard (Looks Real, Behaves Simple)

### UI Sections

* Sticky navbar (identity + status)
* Feed (posts from multiple users)
* Sidebars (friends, stories — cosmetic)
* Report button per post

### Interactions

* Like (cosmetic)
* Share (fake)
* Report (functional)

---

## 🚨 Reporting → Enforcement Flow

### User A reports a post

```js
openReport(postId)
submitReport()
```

### System Response

1. Report recorded
2. Notification shown
3. Threshold reached (1 report)
4. Target user status → `locked`
5. Data lifecycle updated
6. Optional block prompt

### Logs

```
[WARN] Report submitted
[ERROR] Account locked
[INFO] Data state → retained
```

---

## 🔒 Locked Account Experience

### locked.html

When User B tries to log in:

* Access fully denied
* Neutral explanation
* No appeal flow
* No internal details
* Clear finality

### Available Actions

* “Learn more” (static)
* “Export my data” (fails)

---

## 📦 Data Export Attempt (Core Moment)

User clicks **Export My Data**

### UX Outcome

* Spinner
* Toast:
  ❌ *“Data export unavailable for locked accounts”*

### Reality (Internal)

```js
localStorage.users
localStorage.posts
localStorage.activityLogs
```

All still exist.

> This contrast is the **entire point of the POC**.

---

## 🔔 Notification System

Reusable toast component:

* success (green)
* info (blue)
* warning (orange)
* error (red)

Auto-dismissed, mobile-safe, non-blocking.

```js
toast("Account locked", "error");
```

---

## 🧾 Logging System

All actions produce logs with:

* timestamp
* severity
* message

```
[INFO] Login success
[WARN] Report submitted
[ERROR] Access denied
```

Optional collapsible log panel for demos.

---

## 📱 Mobile-First by Design

* CSS Grid → collapses to single column
* Sidebars hidden on small screens
* Bottom-sheet modals
* Large tap targets
* No hover reliance
* Toasts reposition to bottom

---

## 📘 README (Narrative, Not Marketing)

README explains:

* What is being demonstrated
* Why localStorage is used
* What happens after lockout
* Why export is denied
* How this maps to real platforms
* Explicit ethical framing

---

# 🚧 v0.2.0 — Post-Lock Data Lifecycle Simulation

## 🎯 Objective

Extend the POC to demonstrate **what can happen to data after access is revoked**, without implying endorsement.

> This version illustrates **opacity**, not abuse.

---

## 🧠 Core Idea

> **Access revoked ≠ data erased**

---

## 🆕 Concepts Introduced

### 1️⃣ Data Lifecycle State Machine

```js
dataState:
  "active" |
  "restricted" |
  "retained" |
  "shared" |
  "deleted"
```

* User sees **none** of this
* System sees **everything**

---

### 2️⃣ Silent Background Processing

After lock:

* No user-facing changes
* Logs show continued processing

```
[INFO] Background job: analytics enabled
```

---

### 3️⃣ Third-Party Access Flag (Simulated)

```js
thirdPartyAccess: true
```

Visible only in:

* logs
* system dashboard

No real data leaves the browser.

---

### 4️⃣ Retention Timeline

```js
retentionUntil: "2026-12-31"
```

* Hidden from user
* Visible internally

Highlights **information asymmetry**.

---

### 5️⃣ Internal System View (`system.html`)

* Not linked
* Read-only
* Simulates internal tooling

Shows:

* users
* status
* data states
* processing flags
* retention windows

Contrasts sharply with locked user screen.

---

## 🧾 Expanded Logging

```
[INFO] Account locked
[INFO] Data state → retained
[INFO] Third-party processing enabled
[INFO] Retention until 2026-12-31
```

---

## 🧠 Ethical Guardrails

Everywhere:

* “Simulation”
* “Educational”
* “No real data”
* “Illustrates visibility gaps”

Clear, explicit, unavoidable.

---

## 🔜 v0.3.0 (Optional, If You Want)

* Erasure request flow
* Deletion verification UX
* “Good governance” reference model
* Post-lock transparency report

---

## ✅ Why This Works
* Technically simple
* Visually powerful
* Ethically framed
* Politically neutral
* Easy to demo
* Easy to discuss
* Hard to dismiss