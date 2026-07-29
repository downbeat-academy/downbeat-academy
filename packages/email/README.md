# email

Transactional email templates for Downbeat Academy, built with
[react-email](https://react.email).

```bash
pnpm email:dev      # preview server
```

## Templates

`ContactFormEmail`, `FileDownloadEmail`, `ResetPasswordEmail`, `VerifyEmail` — exported
from `emails/index.ts`. `components/` holds a small email-specific design system (Body,
Button, Container, Heading, Link, Text) using inline-style objects.

**Email styling is not web styling.** Do not import `cadence-core` or `cadence-tokens`
here — CSS custom properties do not resolve in most email clients.

## Consumers

`apps/auth` only, which renders the verification and password-reset templates and sends
them through Resend. It imports the deep path `email/emails/index`, because this
package's `main` field points at a nonexistent `index.js`.

`apps/www` does **not** use this package; it duplicates email logic in
`src/actions/email/`.

## Documentation

- [`AGENTS.md`](./AGENTS.md)
