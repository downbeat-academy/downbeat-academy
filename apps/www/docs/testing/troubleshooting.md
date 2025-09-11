# Troubleshooting Guide

This guide consolidates solutions for common issues when running Cypress E2E tests for the Downbeat Academy WWW application.

## Environment Issues

### Missing Environment Variables

**Error:** `Required environment variable 'BETTER_AUTH_SECRET' is not set`

**Solution:**
1. Run validation to see all missing variables:
   ```bash
   pnpm test:validate-env
   ```

2. Generate template with all required variables:
   ```bash
   pnpm test:validate-env:template
   cp .env.template .env
   ```

3. Fill in missing values in `.env` file

### Invalid URL Format

**Error:** `Invalid value for 'NEXT_PUBLIC_PROJECT_URL': Must be a valid URL`

**Solution:**
- Ensure URL includes protocol: `http://localhost:3000` (not just `localhost:3000`)
- Check for typos in URL
- Verify port number matches your dev server

## Database Issues

### Connection Failed

**Error:** `Database connection failed` or `ECONNREFUSED`

**Solutions:**
1. Verify PostgreSQL is running:
   ```bash
   # macOS
   brew services list | grep postgresql
   
   # Linux
   systemctl status postgresql
   ```

2. Test connection directly:
   ```bash
   psql "$DATABASE_URL" -c "SELECT 1"
   ```

3. Check connection string format:
   ```
   postgresql://username:password@host:5432/database_name
   ```

4. Ensure database exists:
   ```bash
   createdb downbeat_test
   ```

### Schema Issues

**Error:** `relation "user" does not exist`

**Solution:**
```bash
# Push database schema
pnpm db:push

# Or complete reset
pnpm test:db:reset
```

## Test User Issues

### Users Not Found

**Error:** `Test users not found in database`

**Solutions:**
1. Verify users exist:
   ```bash
   pnpm test:verify
   ```

2. Re-seed test users:
   ```bash
   pnpm db:seed:test
   ```

3. Complete environment reset:
   ```bash
   pnpm test:prepare
   ```

### Authentication Failures

**Error:** `Invalid credentials` when logging in with test users

**Solutions:**
1. Verify BETTER_AUTH_SECRET is at least 32 characters:
   ```bash
   echo $BETTER_AUTH_SECRET | wc -c
   ```

2. Ensure test users haven't been modified:
   ```bash
   pnpm test:db:reset
   ```

3. Check authentication setup:
   ```bash
   tsx scripts/verify-test-users.ts
   ```

## TypeScript Issues

### Type Errors in Cypress

**Error:** `Cannot find module` or TypeScript compilation errors

**Solutions:**
1. Clear Cypress cache:
   ```bash
   rm -rf ~/.cache/Cypress
   ```

2. Reinstall dependencies:
   ```bash
   pnpm install
   ```

3. Rebuild project:
   ```bash
   pnpm build
   ```

### Missing Type Definitions

**Error:** `Property does not exist on type 'cy'`

**Solution:**
Ensure `cypress/support/index.d.ts` includes custom command types:
```typescript
declare namespace Cypress {
  interface Chainable {
    login(email: string, password: string): Chainable<void>
    verifyTestUsers(): Chainable<void>
  }
}
```

## CI/CD Issues

### GitHub Actions Failures

**Error:** Tests pass locally but fail in CI

**Solutions:**
1. Run CI validation locally:
   ```bash
   pnpm test:ci-check
   ```

2. Ensure all required secrets are set in GitHub:
   - Go to Settings → Secrets and Variables → Actions
   - Add: `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_PROJECT_URL`

3. Check CI logs for specific errors:
   - Look for "Validate CI environment" step output
   - Check "Setup test environment" logs

### Timeout Issues

**Error:** `TimeoutError: Timed out after waiting 60000ms`

**Solutions:**
1. Increase Cypress timeout in `cypress.config.ts`:
   ```typescript
   defaultCommandTimeout: 10000,
   requestTimeout: 10000,
   ```

2. Ensure app is running before tests:
   ```bash
   # In separate terminal
   pnpm dev
   
   # Then run tests
   pnpm cypress:run
   ```

## Performance Issues

### Slow Test Execution

**Solutions:**
1. Use headless mode for faster execution:
   ```bash
   pnpm cypress:run
   ```

2. Parallelize tests in CI:
   ```yaml
   strategy:
     matrix:
       containers: [1, 2, 3]
   ```

3. Clean up test data efficiently:
   ```typescript
   afterEach(() => {
     cy.task('db:clean')
   })
   ```

### Memory Issues

**Error:** `JavaScript heap out of memory`

**Solutions:**
1. Increase Node memory:
   ```bash
   NODE_OPTIONS="--max-old-space-size=4096" pnpm cypress:run
   ```

2. Clear Cypress cache:
   ```bash
   npx cypress cache clear
   ```

## Common Cypress Errors

### Element Not Found

**Error:** `Timed out retrying after 4000ms: Expected to find element`

**Solutions:**
1. Add explicit waits:
   ```typescript
   cy.get('[data-testid="element"]', { timeout: 10000 })
   ```

2. Wait for page load:
   ```typescript
   cy.visit('/page')
   cy.contains('Page Title').should('be.visible')
   ```

### Network Errors

**Error:** `cy.request() failed on`

**Solutions:**
1. Ensure API is running
2. Check CORS configuration
3. Use cy.intercept() for API mocking:
   ```typescript
   cy.intercept('GET', '/api/users', { fixture: 'users.json' })
   ```

## Debug Commands

### Quick Diagnostics
```bash
# Check all environment variables
pnpm test:validate-env

# Test database connection
psql "$DATABASE_URL" -c "\l"

# Verify test users
tsx scripts/verify-test-users.ts

# Check Node/npm versions
node --version && npm --version
```

### Reset Everything
```bash
# Complete reset
pnpm test:db:reset && pnpm test:verify && pnpm cypress:run
```

## Getting Help

If issues persist after trying these solutions:

1. Check existing GitHub issues
2. Review CI logs for detailed error messages
3. Run with debug logging:
   ```bash
   DEBUG=cypress:* pnpm cypress:run
   ```

## Related Documentation

- [Quick Start Guide](../setup/quick-start.md) - Initial setup
- [Environment Variables](../setup/environment-variables.md) - Configuration details
- [Test Users](./test-users.md) - User management
- [CI/CD Setup](./ci-cd.md) - GitHub Actions configuration