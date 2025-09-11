# Quick Start Guide - Cypress E2E Testing

This guide provides the fastest path to get Cypress E2E tests running for the Downbeat Academy WWW application.

## Prerequisites

- Node.js (v18+)
- PostgreSQL database
- pnpm package manager

## Step-by-Step Setup

### 1. Environment Configuration

Create your environment file from the template:

```bash
cp .env.example .env
```

Configure the required variables:

```bash
# Database connection (choose one)
DATABASE_URL=postgresql://user:password@localhost:5432/downbeat_dev
# OR for dedicated test database
TEST_DATABASE_URL=postgresql://user:password@localhost:5432/downbeat_test

# Authentication secret (minimum 32 characters)
BETTER_AUTH_SECRET=your-32-character-secret-key-here

# Application URL
NEXT_PUBLIC_PROJECT_URL=http://localhost:3000
```

### 2. Database Setup

Initialize the database and seed test users:

```bash
# Push database schema
pnpm db:push

# Complete test environment setup
pnpm test:prepare
```

This creates the following test users automatically:
- Student: `test-student@example.com`
- Educator: `test-educator@example.com`
- Admin: `test-admin@example.com`
- Super Admin: `test-superadmin@example.com`

All test users use the password: `TestPassword123!`

### 3. Running Tests

#### Interactive Mode (Recommended for Development)
```bash
pnpm cypress:open
```

#### Headless Mode (CI/Automated Testing)
```bash
pnpm cypress:run
```

## Quick Verification

Validate your setup is correct:

```bash
# Check environment configuration
pnpm test:validate-env

# Verify test users exist
pnpm test:verify
```

## Common Issues

### Environment Validation Fails
Run `pnpm test:validate-env` to see exactly which variables are missing or misconfigured.

### Database Connection Issues
Test your database connection:
```bash
psql "$DATABASE_URL" -c "SELECT 1"
```

### Test Users Missing
Re-run the test preparation:
```bash
pnpm test:prepare
```

## Next Steps

- For detailed environment setup, see [Environment Variables](./environment-variables.md)
- For test user management, see [Test Users Guide](../testing/test-users.md)
- For troubleshooting, see [Troubleshooting Guide](../testing/troubleshooting.md)
- For all available commands, see [Commands Reference](../reference/commands.md)

## Related Documentation

- [Environment Variables](./environment-variables.md) - Complete environment reference
- [CI/CD Setup](../testing/ci-cd.md) - GitHub Actions configuration
- [Troubleshooting](../testing/troubleshooting.md) - Common issues and solutions