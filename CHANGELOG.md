# Changelog

All notable changes to this project are documented here.

---

## [0.2.0] – Post-Lock Data Lifecycle Simulation

### Added
- Data lifecycle states for users (`active`, `retained`)
- Simulated third-party processing flags for locked accounts
- Retention metadata with defined timelines
- Internal system-only dashboard (`system.html`)
- Background processing logs for locked users

### Changed
- Reporting a user now triggers:
  - account lock
  - data state transition
  - retention assignment
  - internal-only processing visibility

### User Impact
- Locked users:
  - cannot log in
  - cannot export data
  - have no visibility into retained or processed data
- System view:
  - retains full visibility into user data state and processing

### Notes
- No backend
- No real data sharing
- All behavior simulated using `localStorage`
- Built to illustrate **post-lock data opacity**, not real-world enforcement behavior

---

## [0.1.0] – Initial POC

### Added
- Simulated login/register (email + Google)
- Social feed with posting and reporting
- Account lockout flow
- Data export denial for locked users
- Notification and logging system
