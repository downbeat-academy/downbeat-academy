# Test Users Guide

This document provides comprehensive information about test users in the Downbeat Academy E2E testing environment.

## Test User Accounts

The following test users are automatically created for E2E testing:

| Role | Email | Password | Purpose |
|------|-------|----------|---------|
| Student | `test-student@example.com` | `TestPassword123!` | Basic user features testing |
| Educator | `test-educator@example.com` | `TestPassword123!` | Educator-specific features |
| Admin | `test-admin@example.com` | `TestPassword123!` | Administrative functions |
| Super Admin | `test-superadmin@example.com` | `TestPassword123!` | Full system access testing |

## User Management

### Creating Test Users

Test users are automatically created when you run:

```bash
# Complete test preparation (recommended)
pnpm test:prepare

# Or individually
pnpm db:seed:test
```

### Verifying Test Users

Check that all test users exist in the database:

```bash
pnpm test:verify
```

This command will:
- Check for all required test users
- Re-seed any missing users automatically
- Display verification status for each user

### Manual Test User Seeding

If automatic seeding fails, you can manually seed test users:

```bash
tsx cypress/support/db-seed.ts
```

## Configuration

### Test User Credentials Location

Test user credentials are defined in `cypress.config.ts`:

```typescript
env: {
  TEST_STUDENT_EMAIL: 'test-student@example.com',
  TEST_STUDENT_PASSWORD: 'TestPassword123!',
  TEST_EDUCATOR_EMAIL: 'test-educator@example.com',
  TEST_EDUCATOR_PASSWORD: 'TestPassword123!',
  TEST_ADMIN_EMAIL: 'test-admin@example.com',
  TEST_ADMIN_PASSWORD: 'TestPassword123!',
  TEST_SUPER_ADMIN_EMAIL: 'test-superadmin@example.com',
  TEST_SUPER_ADMIN_PASSWORD: 'TestPassword123!'
}
```

### Using Test Users in Tests

Access test user credentials in Cypress tests:

```typescript
// Login as student
cy.login(
  Cypress.env('TEST_STUDENT_EMAIL'),
  Cypress.env('TEST_STUDENT_PASSWORD')
);

// Login as admin
cy.login(
  Cypress.env('TEST_ADMIN_EMAIL'),
  Cypress.env('TEST_ADMIN_PASSWORD')
);
```

## Test User Roles

### Student Role
- Access to course content
- Can submit assignments
- View personal progress
- Limited to student dashboard

### Educator Role
- Create and manage courses
- Grade assignments
- View student progress
- Access educator dashboard

### Admin Role
- User management capabilities
- System configuration access
- Content moderation
- Analytics and reporting

### Super Admin Role
- Full system access
- Database management
- Security settings
- All administrative features

## Database Management

### Clean Test Users

To clean up test users between test runs:

```typescript
// In your test file
beforeEach(() => {
  cy.task('db:clean');
});

afterEach(() => {
  cy.task('db:clean');
});
```

### Reset Test Environment

Complete reset of test database and users:

```bash
pnpm test:db:reset
```

## CI/CD Integration

### Automatic User Creation

The CI workflows automatically handle test user creation:

1. Database schema is pushed
2. Test users are seeded
3. User existence is verified
4. Tests proceed only if all users exist

### GitHub Actions Setup

Test users are created in CI using:

```yaml
- name: Setup test environment
  run: pnpm test:prepare
```

## Troubleshooting

### Test Users Not Found

If tests fail with "user not found" errors:

1. Verify database connection:
   ```bash
   pnpm test:validate-env
   ```

2. Re-run test preparation:
   ```bash
   pnpm test:prepare
   ```

3. Check specific user:
   ```bash
   tsx scripts/verify-test-users.ts
   ```

### Authentication Failures

If login fails for test users:

1. Verify BETTER_AUTH_SECRET is set correctly
2. Check password hasn't been changed in tests
3. Ensure database migrations are current:
   ```bash
   pnpm db:push
   ```

### Database Connection Issues

If seeding fails:

1. Check DATABASE_URL or TEST_DATABASE_URL is correct
2. Ensure PostgreSQL is running
3. Verify database permissions

## Best Practices

### Test Isolation
- Clean test data before and after each test
- Don't modify test user passwords in tests
- Use unique data for each test run

### Security Considerations
- Never use production credentials in tests
- Keep test database separate from development
- Use environment variables for sensitive data

### Performance Tips
- Reuse test users across tests when possible
- Only reset users when necessary
- Use database transactions for faster cleanup

## Related Documentation

- [Quick Start Guide](../setup/quick-start.md) - Getting started with testing
- [Environment Variables](../setup/environment-variables.md) - Database configuration
- [Troubleshooting](./troubleshooting.md) - Common issues and solutions
- [CI/CD Setup](./ci-cd.md) - Automated testing configuration