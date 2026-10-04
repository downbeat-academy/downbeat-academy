---
'www': minor
---

Add analytics-cookie consent (DBA-287). PostHog now starts cookieless (`cookieless_mode: 'on_reject'`, opted out by default): visitors who have not answered, or who decline, are counted with a server-side hash and nothing is stored on their device. Accepting the new banner switches to cookies and a persistent id, and `identify()` only runs for signed-in users who have accepted. The choice is a first-party `dba_analytics_consent` cookie, and the footer gains a "Cookie settings" button that reopens the banner. Cookieless server hash mode must be enabled in the PostHog project settings, or events from visitors who have not accepted are dropped.
