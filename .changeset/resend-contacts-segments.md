---
'www': patch
---

Fix newsletter and file-download sign-ups, which failed on every attempt because `RESEND_DEFAULT_AUDIENCE_ID` was never configured in production. Resend has replaced Audiences with Segments, so contacts are now added to the segment in `RESEND_SEGMENT_ID`, and deleting a contact needs only the email.

The Resend actions also now check the `error` Resend returns rather than relying on it throwing. Before, a failed API call showed a success toast and still fired the analytics event. The underlying error is now logged before the generic message is thrown.
