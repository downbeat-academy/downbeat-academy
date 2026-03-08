---
"cadence-links": minor
---

Replace local authentication layer with centralized auth service integration. Auth operations (sign-in, sign-up, password reset) are now handled by the auth service at auth.downbeatacademy.com. The cadence-links app now only validates sessions against the shared auth database.
