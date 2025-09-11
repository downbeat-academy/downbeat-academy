# Environment Variables for Cypress E2E Tests

This document provides a comprehensive guide to environment variables required for running Cypress E2E tests in the Downbeat Academy project.

## Overview

The Cypress E2E test suite requires specific environment variables to be properly configured for successful execution. These variables handle database connections, authentication, external services, and test configuration.

## Variable Categories

### Required Variables

These variables **must** be set for Cypress tests to run:

#### Database Connection
At least one of these database connection strings must be configured:

- `DATABASE_URL` - Primary database connection string
- `DATABASE_URL_AUTH` - Auth-specific database connection string  
- `TEST_DATABASE_URL` - Dedicated test database (recommended for CI)

**Format:** `postgresql://user:password@host:5432/database_name`

**Example:**
```bash
# Local development
DATABASE_URL=postgresql://postgres:password@localhost:5432/downbeat_dev

# CI environment (recommended)
TEST_DATABASE_URL=postgresql://postgres:test_password@localhost:5432/test_db
```

#### Authentication
- `BETTER_AUTH_SECRET` - Secret key for Better Auth authentication
  - **Requirements:** Minimum 32 characters, cryptographically secure
  - **Example:** `DVb0BpI4NJk9uQfpaTgX1IRBF6VPEg0b`

#### Application URLs
- `NEXT_PUBLIC_PROJECT_URL` - Public URL for the application
  - **Local:** `http://localhost:3000`
  - **Production:** `https://your-domain.com`

### Optional Variables

These variables enhance functionality but are not strictly required:

#### Authentication (Production)
- `BETTER_AUTH_URL` - Better Auth base URL (production environments only)
  - **Example:** `https://your-domain.com`

#### Cypress Configuration
- `CYPRESS_BASE_URL` - Override base URL for Cypress tests
  - **Default:** Uses `NEXT_PUBLIC_PROJECT_URL` if not set
  - **Example:** `http://localhost:3000`

#### External Services
- `RESEND_API_KEY` - Resend API key for email functionality
  - **Format:** Starts with `re_`
  - **Example:** `re_7C3g4wZP_Fk8Jh866jTKNQDE2wB4u2ptH`

#### CMS Integration (Sanity)
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Sanity CMS project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Sanity dataset name (usually `production`)
- `NEXT_PUBLIC_SANITY_API_VERSION` - API version (e.g., `2023-06-21`)
- `SANITY_API_TOKEN` - API token for read/write operations

#### CI/CD Detection
These are automatically set by CI environments:
- `CI` - Set to `true` in CI environments
- `GITHUB_ACTIONS` - Set to `true` in GitHub Actions

## Test User Configuration

Test users are configured in the Cypress config file (`cypress.config.ts`) with these predefined credentials:

```typescript
// Test user credentials (defined in Cypress config)
TEST_STUDENT_EMAIL: 'test-student@example.com'
TEST_STUDENT_PASSWORD: 'TestPassword123!'
TEST_EDUCATOR_EMAIL: 'test-educator@example.com'
TEST_EDUCATOR_PASSWORD: 'TestPassword123!'
TEST_ADMIN_EMAIL: 'test-admin@example.com'
TEST_ADMIN_PASSWORD: 'TestPassword123!'
TEST_SUPER_ADMIN_EMAIL: 'test-superadmin@example.com'
TEST_SUPER_ADMIN_PASSWORD: 'TestPassword123!'
```

These users are automatically seeded before tests run.

## Environment Setup

### Local Development

1. Copy `.env.local` template:
```bash
# Create from template
cp .env.local.example .env.local
```

2. Configure required variables:
```bash
# Database
DATABASE_URL=postgresql://postgres:password@localhost:5432/downbeat_dev

# Authentication
BETTER_AUTH_SECRET=your-32-character-secret-key-here

# Application
NEXT_PUBLIC_PROJECT_URL=http://localhost:3000
```

3. Validate configuration:
```bash
tsx scripts/validate-test-env.ts
```

### CI/CD Setup (GitHub Actions)

Configure these as **GitHub Secrets** in your repository:

**Repository → Settings → Secrets and Variables → Actions**

#### Required Secrets:
- `BETTER_AUTH_SECRET` - 32+ character secure random string
- `BETTER_AUTH_URL` - Production app URL
- `NEXT_PUBLIC_PROJECT_URL` - Public app URL

#### Optional Secrets:
- `RESEND_API_KEY` - For email functionality
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - CMS integration
- `NEXT_PUBLIC_SANITY_DATASET` - CMS dataset
- `NEXT_PUBLIC_SANITY_API_VERSION` - CMS API version
- `SANITY_API_TOKEN` - CMS API token

Database variables are configured automatically by the CI workflow.

## Validation and Testing

### Environment Validation Scripts

#### Local Validation
```bash
# Comprehensive validation
tsx scripts/validate-test-env.ts

# Generate environment template
tsx scripts/validate-test-env.ts --generate-template
```

#### CI Validation
```bash
# CI-specific pre-checks
tsx scripts/ci-env-check.ts
```

#### Test Environment Setup
```bash
# Setup and verify test environment
pnpm test:prepare

# Individual commands
pnpm test:setup    # Setup database and schema
pnpm test:verify   # Verify test users exist
```

### Automated Validation

The Cypress configuration includes automatic environment validation that runs before tests:

- ✅ Validates all required variables are set
- ✅ Tests database connectivity
- ✅ Verifies URL formats and API key formats
- ✅ Confirms test user configuration
- ❌ Fails fast if critical variables are missing

## Troubleshooting

### Common Issues

#### Database Connection Errors
```
Error: Database connection failed
```
**Solutions:**
- Verify database URL format
- Ensure database server is running
- Check credentials and permissions
- For CI: Verify PostgreSQL service is configured

#### Missing Environment Variables
```
Error: Required environment variable 'BETTER_AUTH_SECRET' is not set
```
**Solutions:**
- Add missing variable to `.env.local` (local)
- Add as GitHub Secret (CI)
- Run validation script for detailed guidance

#### Invalid URL Format
```
Error: Invalid value for 'NEXT_PUBLIC_PROJECT_URL': Must be a valid URL
```
**Solutions:**
- Ensure URL includes protocol (`http://` or `https://`)
- Check for typos in URL
- Verify port number is correct

#### Test User Issues
```
Error: Test users not found in database
```
**Solutions:**
- Run database seeding: `pnpm db:seed:test`
- Verify database schema: `pnpm db:push`
- Check database connection
- Run full test setup: `pnpm test:prepare`

### Debug Commands

```bash
# Check current environment
printenv | grep -E "(DATABASE|BETTER_AUTH|NEXT_PUBLIC|CYPRESS)"

# Test database connection
tsx scripts/validate-test-env.ts

# Full CI pre-check (in CI environment)
tsx scripts/ci-env-check.ts

# Manual test user verification
tsx scripts/verify-test-users.ts

# Manual environment setup
tsx scripts/setup-test-env.ts
```

## Security Considerations

### Sensitive Variables
Never commit these to version control:
- `BETTER_AUTH_SECRET`
- `DATABASE_URL` (with real credentials)
- `RESEND_API_KEY`
- `SANITY_API_TOKEN`

### Best Practices
- Use separate databases for development and testing
- Generate cryptographically secure secrets
- Use GitHub Secrets for CI/CD
- Regularly rotate API keys and secrets
- Use dedicated test database for CI isolation

## Integration with Existing Setup

This environment validation system integrates with existing project infrastructure:

- ✅ **Cypress Configuration** - Automatic validation in `cypress.config.ts`
- ✅ **CI Workflows** - Pre-check step in GitHub Actions
- ✅ **Database Seeding** - Works with existing seed scripts
- ✅ **Better Auth** - Compatible with current auth setup
- ✅ **Package Scripts** - Extends existing npm scripts

## Support

If you encounter issues not covered in this guide:

1. Run the validation script: `tsx scripts/validate-test-env.ts`
2. Check the troubleshooting section above
3. Review CI logs for specific error messages
4. Verify all GitHub Secrets are properly configured