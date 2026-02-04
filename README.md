# Account Lockout & Data Access POC

This project demonstrates how a user can:
- be reported
- have their account permanently locked
- lose login access
- lose data export access
- while their data still exists in the system

## Key Points
- No backend
- Pure HTML/CSS/JS
- localStorage simulates persistence
- Export denial is intentional

This POC is for educational and discussion purposes.


## v0.2.0 – Post-Lock Data Lifecycle

This version demonstrates that:
- account access can be revoked
- data export can be denied
- data may still be retained internally
- third-party processing may continue
- users have no visibility into these states

All behavior is simulated using localStorage.
No real data is transmitted.
