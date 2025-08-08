# E2E Test Optimization Guide

This guide explains the test optimization strategies in place to ensure efficient resource usage while maintaining test coverage.

## Test Execution Strategy

### 1. Skipped Tests (Temporary)

**Accessibility Tests**: Currently skipped using `describe.skip()` in `cypress/e2e/accessibility/a11y-tests.cy.ts`

To run accessibility tests manually:
```bash
# Run skipped accessibility tests
pnpm cypress:run:a11y:only

# Or open in interactive mode
pnpm cypress
# Then manually run the accessibility test file
```

To re-enable accessibility tests:
1. Remove `.skip` from `describe.skip('Accessibility Tests', ...)`
2. Fix failing tests
3. Update CI workflow to fail on test errors

### 2. Git Ignored Files

The following test artifacts are automatically ignored by git:
- `cypress/screenshots/` - Failed test screenshots
- `cypress/videos/` - Test execution videos
- `*.mp4` - Any video files

These are automatically cleaned up in CI but persist locally for debugging.

### 3. CI/CD Test Strategy

#### Two-Tier Testing Approach

**Quick Smoke Tests (PRs)**
- Runs on every PR that touches www app
- Only runs critical path tests
- Takes ~2-3 minutes
- Doesn't block merging

**Full Test Suite (Main branch)**
- Runs on push to main
- Runs complete test suite
- Takes ~10-15 minutes
- Currently doesn't fail builds (temporary)

#### Workflow Files

1. **`.github/workflows/ci-www.yml`** - Main CI (linting, building)
2. **`.github/workflows/ci-www-e2e.yml`** - E2E tests with smart triggers

### 4. Resource Optimization

#### Path-based Triggers
Tests only run when relevant files change:
- `apps/www/**` - Application code
- `packages/cadence-**/**` - Design system packages
- `.github/workflows/ci-www-e2e.yml` - Test workflow
- `pnpm-lock.yaml` - Dependencies

#### Concurrency Control
```yaml
concurrency:
  group: e2e-tests-${{ github.head_ref || github.ref }}
  cancel-in-progress: true
```
This cancels old test runs when new commits are pushed.

#### Manual Test Selection
You can manually trigger specific test suites:
1. Go to Actions tab in GitHub
2. Select "E2E Tests - www" workflow
3. Click "Run workflow"
4. Choose test suite: all, auth, routes, forms, journeys, or smoke

### 5. Local Development Optimization

#### Run Only What You Need
```bash
# During development, run only the tests you're working on
pnpm cypress:run:auth      # Just auth tests
pnpm cypress:run:forms     # Just form tests

# Use interactive mode for debugging
pnpm cypress               # Opens Cypress UI
```

#### Parallel Test Execution
```bash
# Run tests in parallel (requires Cypress Cloud account)
pnpm cypress:run -- --parallel --record
```

### 6. Performance Tips

#### Faster Local Testing
1. **Use headed mode during development**: `pnpm cypress`
2. **Run specific test files**: Click on individual files in Cypress UI
3. **Use `.only` temporarily**: `it.only('test name', ...)` to run single test
4. **Skip slow tests locally**: Add `if (Cypress.env('CI'))` for CI-only tests

#### Database Optimization
```bash
# Keep test database running between test runs
docker compose -f docker-compose.test.yml up -d

# Clean data instead of recreating database
pnpm db:seed:test
```

### 7. Transitioning to Strict Mode

When you're ready to enforce test passing:

1. **Remove `continue-on-error: true`** from workflows
2. **Remove `.skip` from test suites**
3. **Update branch protection rules** to require test passing
4. **Add test coverage reporting**

### 8. Test Execution Times

Approximate execution times:
- **Smoke tests**: 2-3 minutes
- **Auth tests**: 3-4 minutes
- **Route tests**: 2-3 minutes
- **Form tests**: 3-4 minutes
- **Accessibility tests**: 4-5 minutes
- **Journey tests**: 5-6 minutes
- **Full suite**: 15-20 minutes

### 9. Monitoring Test Health

#### GitHub Actions Dashboard
- View test history in Actions tab
- Download artifacts for failed tests
- Monitor execution times

#### Local Test Reports
```bash
# Generate HTML report
pnpm cypress:run -- --reporter mochawesome

# Open coverage report
open mochawesome-report/mochawesome.html
```

### 10. Best Practices

1. **Fix failing tests promptly** - Don't let tech debt accumulate
2. **Run smoke tests before pushing** - Catch obvious issues early
3. **Use PR drafts** - Mark PR as draft if tests are expected to fail
4. **Monitor test execution time** - Refactor slow tests
5. **Clean up test data** - Ensure tests don't interfere with each other

## Quick Reference

```bash
# Skip all E2E tests locally
CYPRESS_SKIP_TESTS=true pnpm dev

# Run only non-skipped tests
pnpm cypress:run

# Run all tests including skipped
CYPRESS_RUN_SKIPPED=true pnpm cypress:run

# Clean test artifacts
rm -rf cypress/screenshots cypress/videos

# Check what tests would run
pnpm cypress:run --spec "cypress/e2e/**/*.cy.ts" --list-specs
```