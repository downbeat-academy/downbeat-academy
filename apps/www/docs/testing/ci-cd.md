# CI/CD Configuration Guide

This guide covers GitHub Actions setup for Cypress E2E testing in the Downbeat Academy project.

## GitHub Actions Workflows

### Workflow Files

The project uses two main workflows for testing:

- `.github/workflows/ci-www.yml` - Main CI workflow
- `.github/workflows/ci-www-e2e.yml` - E2E testing workflow

### Workflow Structure

```yaml
name: CI - WWW E2E Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  e2e-tests:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:14
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
```

## Required GitHub Secrets

Configure these in your repository settings under **Settings → Secrets and Variables → Actions**:

### Required Secrets

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `BETTER_AUTH_SECRET` | Authentication secret (32+ chars) | `DVb0BpI4NJk9uQfpaTgX1IRBF6VPEg0b` |
| `BETTER_AUTH_URL` | Production app URL | `https://downbeatacademy.com` |
| `NEXT_PUBLIC_PROJECT_URL` | Public app URL | `https://downbeatacademy.com` |

### Optional Secrets

| Secret Name | Description | When Needed |
|-------------|-------------|-------------|
| `RESEND_API_KEY` | Email service API key | Email functionality |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity CMS project ID | CMS integration |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset | CMS integration |
| `SANITY_API_TOKEN` | Sanity API token | CMS write operations |

## CI Environment Setup

### Automatic Database Configuration

The CI workflow automatically configures database variables:

```yaml
env:
  DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
  DATABASE_URL_AUTH: postgresql://postgres:postgres@localhost:5432/test_db
  TEST_DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test_db
```

### Environment Validation

The workflow includes a validation step before running tests:

```yaml
- name: Validate CI environment
  run: pnpm test:ci-check
```

This step:
- Validates all required environment variables
- Checks GitHub Secrets are properly configured
- Provides detailed error messages if setup is incorrect

### Test Environment Preparation

```yaml
- name: Setup test environment
  run: pnpm test:prepare
```

This command:
1. Creates database schema (`pnpm db:push`)
2. Seeds test users (`pnpm db:seed:test`)
3. Verifies test users exist (`pnpm test:verify`)

## Running E2E Tests in CI

### Basic Test Execution

```yaml
- name: Run E2E tests
  run: pnpm cypress:run
```

### With Artifacts Upload

```yaml
- name: Upload test artifacts
  if: failure()
  uses: actions/upload-artifact@v3
  with:
    name: cypress-artifacts
    path: |
      cypress/screenshots
      cypress/videos
```

## Optimizing CI Performance

### 1. Dependency Caching

```yaml
- name: Cache pnpm modules
  uses: actions/cache@v3
  with:
    path: ~/.pnpm-store
    key: ${{ runner.os }}-pnpm-${{ hashFiles('**/pnpm-lock.yaml') }}
```

### 2. Cypress Binary Caching

```yaml
- name: Cache Cypress binary
  uses: actions/cache@v3
  with:
    path: ~/.cache/Cypress
    key: cypress-${{ runner.os }}-${{ hashFiles('**/package.json') }}
```

### 3. Parallel Test Execution

```yaml
strategy:
  matrix:
    containers: [1, 2, 3]
    
- name: Run E2E tests
  run: pnpm cypress:run --record --parallel
```

## Debugging CI Failures

### Enable Debug Logging

Add to workflow:
```yaml
env:
  DEBUG: cypress:*
  CYPRESS_DEBUG: true
```

### SSH Debugging (for repository owners)

```yaml
- name: Setup tmate session
  if: ${{ failure() }}
  uses: mxschmitt/action-tmate@v3
```

### Check Logs

1. Click on failed workflow run
2. Expand "Validate CI environment" step
3. Review error messages and missing variables
4. Check "Setup test environment" for database issues

## Best Practices

### 1. Use Environment-Specific Secrets

```yaml
# Development
BETTER_AUTH_URL_DEV: http://localhost:3000

# Production
BETTER_AUTH_URL_PROD: https://downbeatacademy.com
```

### 2. Fail Fast on Setup Issues

```yaml
- name: Validate environment
  run: pnpm test:ci-check
  continue-on-error: false
```

### 3. Clean Test State

```yaml
- name: Reset database
  run: pnpm test:db:reset
  if: always()
```

### 4. Timeout Configuration

```yaml
jobs:
  e2e-tests:
    timeout-minutes: 30
    
    steps:
      - name: Run tests
        timeout-minutes: 20
        run: pnpm cypress:run
```

## Security Considerations

### 1. Secret Management

- Never log secret values
- Use GitHub's secret masking
- Rotate secrets regularly

### 2. Database Isolation

- Use dedicated test database
- Don't use production credentials
- Clean up after tests

### 3. Network Security

- Restrict database access to localhost
- Use HTTPS for external APIs
- Validate SSL certificates

## Monitoring and Alerts

### 1. Status Badges

Add to README:
```markdown
![CI Status](https://github.com/user/repo/workflows/CI/badge.svg)
```

### 2. Slack Notifications

```yaml
- name: Notify Slack
  if: failure()
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
```

### 3. Email Notifications

Configure in repository settings under **Settings → Notifications**

## Troubleshooting CI Issues

### Common Problems

1. **Missing Secrets**
   - Check GitHub Secrets configuration
   - Run `pnpm test:ci-check` locally

2. **Database Connection Failures**
   - Verify PostgreSQL service is healthy
   - Check connection string format

3. **Timeout Issues**
   - Increase timeout limits
   - Check for hanging tests

4. **Flaky Tests**
   - Add retry logic
   - Improve test isolation
   - Use explicit waits

### Local CI Simulation

```bash
# Simulate CI environment locally
CI=true \
GITHUB_ACTIONS=true \
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/test_db \
pnpm test:prepare && pnpm cypress:run
```

## Related Documentation

- [Environment Variables](../setup/environment-variables.md) - Complete variable reference
- [Troubleshooting](./troubleshooting.md) - Common issues and solutions
- [Test Users](./test-users.md) - Test user configuration
- [Commands Reference](../reference/commands.md) - All available commands