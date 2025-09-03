# Cypress E2E Testing Setup

## Quick Start

### 1. Set up environment variables

Copy the example environment file and update with your values:

```bash
cp .env.example .env
```

At minimum, you need to set:
- `DATABASE_URL` or `TEST_DATABASE_URL` - Your PostgreSQL connection string
- `BETTER_AUTH_SECRET` - A secure secret (minimum 32 characters)

### 2. Set up the test database

```bash
# Run database migrations
pnpm db:push

# Set up test environment (creates test users)
pnpm test:prepare
```

### 3. Run tests

```bash
# Open Cypress UI
pnpm cypress:open

# Run tests headlessly
pnpm cypress:run
```

## Troubleshooting

### Environment validation fails

If you see environment validation errors, run:

```bash
pnpm test:validate-env
```

This will show you exactly which variables are missing or misconfigured.

### TypeScript errors

The TypeScript configuration has been fixed. If you still see errors:

1. Clear Cypress cache: `rm -rf ~/.cache/Cypress`
2. Reinstall dependencies: `pnpm install`
3. Rebuild the project: `pnpm build`

### Database connection issues

Ensure PostgreSQL is running and the connection string is correct:

```bash
# Test database connection
psql "$DATABASE_URL" -c "SELECT 1"
```

### Authentication test failures

Test users are automatically created by `pnpm test:prepare`. If tests still fail:

```bash
# Verify test users exist
pnpm test:verify

# Manually seed test users
tsx cypress/support/db-seed.ts
```

## Test User Credentials

The following test users are created:

- **Student**: test-student@example.com / TestPassword123!
- **Educator**: test-educator@example.com / TestPassword123!
- **Admin**: test-admin@example.com / TestPassword123!
- **Super Admin**: test-superadmin@example.com / TestPassword123!

## CI/CD Setup

For GitHub Actions, ensure these secrets are set:

- `DATABASE_URL` or `TEST_DATABASE_URL`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL`
- `NEXT_PUBLIC_PROJECT_URL`

The CI workflows have been updated to automatically handle test user seeding.