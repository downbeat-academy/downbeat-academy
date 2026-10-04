---
"auth": patch
---

Fix the sign-up verification email linking to a 404. better-auth already passes an absolute verification URL; the auth service was prefixing its own base URL onto it (DBA-414).
