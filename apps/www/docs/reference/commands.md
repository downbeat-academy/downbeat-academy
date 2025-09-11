# Commands Reference

Quick reference for all available commands in the WWW application.

## Test Environment Setup

| Command | Description |
|---------|-------------|
| `pnpm test:setup` | Setup database schema and seed test users |
| `pnpm test:verify` | Verify all test users exist in database |
| `pnpm test:prepare` | Complete test preparation (setup + verify) |
| `pnpm test:db:reset` | Reset test database (alias for test:setup) |
| `pnpm test:validate-env` | Validate environment configuration |
| `pnpm test:validate-env:template` | Generate .env.template file |
| `pnpm test:ci-check` | Run CI-specific environment checks |

## Database Management

| Command | Description |
|---------|-------------|
| `pnpm db:push` | Push database schema changes |
| `pnpm db:seed:test` | Seed test users to database |
| `tsx cypress/support/db-seed.ts` | Manual test user seeding |
| `tsx scripts/setup-test-env.ts` | Manual environment setup |
| `tsx scripts/verify-test-users.ts` | Manual user verification |

## Cypress Testing

| Command | Description |
|---------|-------------|
| `pnpm cypress:open` | Open Cypress interactive test runner |
| `pnpm cypress:run` | Run Cypress tests headlessly |
| `pnpm cypress` | Alias for cypress:open |

## Environment Validation

| Command | Description |
|---------|-------------|
| `tsx scripts/validate-test-env.ts` | Comprehensive environment validation |
| `tsx scripts/validate-test-env.ts --generate-template` | Generate environment template |
| `tsx scripts/ci-env-check.ts` | CI-specific pre-flight checks |

## Quick Checks

| Command | Description |
|---------|-------------|
| `psql "$DATABASE_URL" -c "SELECT 1"` | Test database connection |
| `printenv \| grep -E "(DATABASE\|BETTER_AUTH\|NEXT_PUBLIC\|CYPRESS)"` | Check environment variables |

## Common Workflows

### Initial Setup
```bash
# 1. Configure environment
cp .env.example .env

# 2. Setup database
pnpm db:push

# 3. Prepare test environment
pnpm test:prepare

# 4. Run tests
pnpm cypress:open
```

### Daily Testing
```bash
# Quick verification and test
pnpm test:verify && pnpm cypress:run
```

### CI/CD Pipeline
```bash
# Complete CI test flow
pnpm test:ci-check && pnpm test:prepare && pnpm cypress:run
```

### Troubleshooting
```bash
# Full environment validation
pnpm test:validate-env

# Reset everything
pnpm test:db:reset && pnpm test:verify
```

## Script Locations

- **Package Scripts**: Defined in `/apps/www/package.json`
- **Setup Scripts**: Located in `/apps/www/scripts/`
- **Cypress Support**: Located in `/apps/www/cypress/support/`
- **Database Seeds**: Located in `/apps/www/cypress/support/db-seed.ts`

## Environment Variables Used

Commands rely on these environment variables:
- `DATABASE_URL` or `TEST_DATABASE_URL` - Database connection
- `BETTER_AUTH_SECRET` - Authentication secret
- `NEXT_PUBLIC_PROJECT_URL` - Application URL

See [Environment Variables](../setup/environment-variables.md) for complete reference.

## Exit Codes

Scripts use standard exit codes:
- `0` - Success
- `1` - General error
- `2` - Missing environment variables
- `3` - Database connection failure

## Related Documentation

- [Quick Start Guide](../setup/quick-start.md) - Getting started
- [Environment Variables](../setup/environment-variables.md) - Configuration reference
- [Test Users](../testing/test-users.md) - User management
- [Troubleshooting](../testing/troubleshooting.md) - Common issues