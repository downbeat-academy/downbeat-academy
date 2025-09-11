# E2E Testing Guide for Downbeat Academy

This guide covers the comprehensive end-to-end (E2E) testing setup for the Downbeat Academy project using Cypress.

## Quick Start

### 1. Verify Your Setup
```bash
# Run comprehensive setup verification
pnpm test:verify-setup

# Quick verification (skip server tests)
pnpm test:verify-setup:quick
```

### 2. Run Tests
```bash
# Run all tests with automatic server management
pnpm test:runner

# Run specific test suites
pnpm test:runner:auth          # Authentication tests only
pnpm test:runner:headed        # Run with browser visible
pnpm test:runner:verbose       # Run with detailed output

# Traditional Cypress commands (require manual server start)
pnpm cypress                   # Open Cypress UI
pnpm cypress:run              # Run all tests headlessly
```

### 3. Debug Issues
```bash
# Check server and environment health
pnpm test:debug-health

# Setup test database and users
pnpm test:prepare

# Verify test users exist
pnpm test:verify
```

## Architecture Overview

### Test Scripts
- **`scripts/test-runner.ts`** - Complete test orchestration with server management
- **`scripts/debug-test-health.ts`** - Health checks and diagnostics  
- **`scripts/verify-test-setup.ts`** - Comprehensive setup verification
- **`cypress/support/db-seed.ts`** - Database seeding for test users

### Test Organization
```
cypress/
├── e2e/                          # End-to-end tests
│   ├── auth/                     # Authentication flows
│   ├── routes/                   # Route accessibility
│   ├── forms/                    # Form submissions  
│   ├── journeys/                 # User journeys
│   ├── accessibility/            # A11y testing
│   └── status-codes/             # Error handling
├── support/                      # Test utilities
│   ├── commands.ts              # Custom Cypress commands
│   ├── db-seed.ts               # Database operations
│   └── index.d.ts               # Type definitions
└── fixtures/                     # Test data
```

## Test Database Setup

### Environment Variables Required
```bash
# Primary database (can be same as test database for local development)
DATABASE_URL="postgresql://user:password@localhost:5432/downbeat"

# Test-specific database (recommended for CI/CD)
TEST_DATABASE_URL="postgresql://user:password@localhost:5432/downbeat_test"

# Authentication
BETTER_AUTH_SECRET="your-secret-key-here"
NEXT_PUBLIC_PROJECT_URL="http://localhost:3000"
```

### Test Users
The system automatically creates these test users:

| Role | Email | Password | Email Verified |
|------|-------|----------|----------------|
| Student | test-student@example.com | TestPassword123! | ✅ |
| Educator | test-educator@example.com | TestPassword123! | ✅ |
| Admin | test-admin@example.com | TestPassword123! | ✅ |
| Super Admin | test-superadmin@example.com | TestPassword123! | ✅ |
| Unverified | test-unverified@example.com | TestPassword123! | ❌ |

## Writing Tests

### Authentication Tests
```typescript
describe('Authentication', () => {
  beforeEach(() => {
    cy.seedDatabase()    // Create test users
    cy.clearAllData()    // Clear cookies/localStorage
  })

  it('should login successfully', () => {
    cy.loginAsStudent()
    cy.get('[data-testid="user-menu"]').should('be.visible')
  })
})
```

### Form Tests
```typescript
describe('Contact Form', () => {
  it('should submit successfully', () => {
    cy.visit('/contact')
    cy.submitContactForm({
      name: 'Test User',
      email: 'test@example.com', 
      message: 'Test message'
    })
    cy.contains('Message sent').should('be.visible')
  })
})
```

### Accessibility Tests
```typescript
describe('Accessibility', () => {
  it('should meet WCAG standards', () => {
    cy.visit('/')
    cy.checkA11y()
  })
})
```

## Custom Commands

### Authentication
- `cy.login(email, password)` - Login via UI
- `cy.loginAsStudent()` - Login as student test user
- `cy.loginAsEducator()` - Login as educator test user
- `cy.loginAsAdmin()` - Login as admin test user
- `cy.logout()` - Logout current user

### Database
- `cy.seedDatabase()` - Create all test users
- `cy.cleanDatabase()` - Remove all test users
- `cy.verifyTestUsers()` - Check test users exist

### Navigation
- `cy.visitProtectedRoute(path)` - Visit protected route
- `cy.verifyRoleAccess(path, shouldHaveAccess)` - Test role-based access

### Utilities  
- `cy.checkServerHealth()` - Verify server is running
- `cy.waitForAuthState()` - Wait for authentication state
- `cy.debugLog(message, data)` - Enhanced logging
- `cy.screenshotWithName(name)` - Named screenshots

## Data Test IDs

### Authentication Pages
- `[data-testid="email-input"]` - Email input field
- `[data-testid="password-input"]` - Password input field  
- `[data-testid="sign-in-submit"]` - Sign in button
- `[data-testid="create-account-tab"]` - Sign up tab
- `[data-testid="signup-name-input"]` - Sign up name field
- `[data-testid="signup-email-input"]` - Sign up email field
- `[data-testid="signup-password-input"]` - Sign up password field
- `[data-testid="signup-confirm-password-input"]` - Confirm password field
- `[data-testid="signup-submit"]` - Sign up button

### Navigation
- `[data-testid="user-menu"]` - Authenticated user menu
- `[data-testid="sign-in-link"]` - Sign in link (when not authenticated)
- `[data-testid="account-link"]` - Account page link
- `[data-testid="logout-button"]` - Logout button
- `[data-testid="nav-articles"]` - Articles navigation link
- `[data-testid="main-navigation"]` - Main navigation container

### Forms
- `[data-testid="newsletter-email-input"]` - Newsletter email field
- `[data-testid="newsletter-submit"]` - Newsletter submit button
- `[data-testid="contact-name-input"]` - Contact form name field
- `[data-testid="contact-email-input"]` - Contact form email field  
- `[data-testid="contact-message-input"]` - Contact form message field
- `[data-testid="contact-submit"]` - Contact form submit button

## Troubleshooting

### Common Issues

#### Tests fail with "User email not verified"
```bash
# Ensure test users are properly seeded
pnpm test:prepare
pnpm test:verify
```

#### Server not starting for tests
```bash
# Check if port 3000 is available
lsof -ti:3000

# Run health check
pnpm test:debug-health

# Check environment variables
pnpm test:validate-env
```

#### Database connection errors
```bash
# Verify database URL is correct
echo $DATABASE_URL
echo $TEST_DATABASE_URL

# Test database connection
pnpm test:verify
```

#### Authentication redirects to sign-in page
- Ensure test users have `emailVerified: true`
- Check that Better Auth secret is set
- Verify session cookies are being set correctly

### Debug Mode
Run tests with verbose output:
```bash
pnpm test:runner:verbose
```

Take screenshots during failures:
```typescript
cy.screenshot('debug-failure-state')
```

View Cypress logs:
```bash
# Open Cypress UI for interactive debugging
pnpm cypress
```

## CI/CD Integration

### GitHub Actions Example
```yaml
- name: Install dependencies
  run: pnpm install

- name: Setup test environment
  run: pnpm test:prepare

- name: Run E2E tests
  run: pnpm test:runner:ci
  env:
    DATABASE_URL: ${{ secrets.DATABASE_URL }}
    BETTER_AUTH_SECRET: ${{ secrets.BETTER_AUTH_SECRET }}
```

### Docker Example
```dockerfile
# Run tests in container
RUN pnpm test:verify-setup
RUN pnpm test:runner
```

## Performance Considerations

- **Parallel Test Execution**: Tests run in isolation with database seeding/cleanup
- **Server Management**: Automatic server startup/shutdown for reliability
- **Resource Cleanup**: Automatic cleanup of test data between runs
- **Timeout Handling**: Appropriate timeouts for different operations
- **Retry Logic**: Built-in retries for flaky operations

## Best Practices

### Test Organization
- Group related tests in describe blocks
- Use descriptive test names
- Clean database state between tests
- Test both happy path and error scenarios

### Data Management
- Use test-specific data
- Clean up after tests
- Avoid dependency between tests
- Use realistic test data

### Assertions
- Be specific with assertions
- Wait for async operations
- Test user-visible behavior
- Include accessibility checks

### Maintenance  
- Keep data-testids stable
- Update tests when UI changes
- Monitor test performance
- Review failed tests promptly

## Advanced Features

### Custom Test Data
```typescript
// Create custom test user
cy.task('db:seed', customUserData)
```

### API Testing
```typescript
// Test API endpoints directly
cy.request('POST', '/api/auth/signin', credentials)
```

### Visual Testing
```typescript
// Compare visual differences
cy.compareSnapshot('page-state')
```

### Performance Testing
```typescript
// Measure page load times
cy.window().its('performance').invoke('now')
```

---

For more information, see:
- [Cypress Documentation](https://docs.cypress.io)
- [Better Auth Documentation](https://www.better-auth.com)
- [Project README](../../README.md)