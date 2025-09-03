# Cypress E2E Testing Suite

This directory contains comprehensive end-to-end tests for the Downbeat Academy www app, implemented using Cypress with TypeScript.

## Test Structure

```
cypress/
├── e2e/                          # E2E test files
│   ├── auth/                     # Authentication flow tests
│   │   └── authentication.cy.ts  # Sign-up, sign-in, password reset, session management
│   ├── routes/                   # Route coverage tests
│   │   ├── public-routes.cy.ts   # Public pages (home, articles, handbook, etc.)
│   │   └── protected-routes.cy.ts # Protected pages with role-based access
│   ├── forms/                    # Form functionality tests
│   │   └── form-tests.cy.ts      # Contact, newsletter, profile forms
│   ├── accessibility/            # Accessibility compliance tests
│   │   └── a11y-tests.cy.ts      # WCAG compliance, keyboard navigation, screen readers
│   └── journeys/                 # User journey tests
│       └── user-journeys.cy.ts   # End-to-end user workflows
├── support/                      # Cypress support files
│   ├── commands.ts              # Custom Cypress commands
│   ├── db-seed.ts               # Database seeding utilities
│   └── e2e.ts                   # Global test setup
└── README.md                    # This file
```

## Test Coverage

### Authentication Tests (`auth/authentication.cy.ts`)
- **Sign-up Flow**: New user registration, validation, error handling
- **Sign-in Flow**: Credential validation, error messages, unverified user handling
- **Password Reset**: Forgot password, reset token validation
- **Session Management**: Session persistence, logout, cross-page navigation
- **Role-based Authentication**: Student, educator, admin, super admin roles
- **Edge Cases**: Network errors, multiple attempts, form security

### Route Coverage Tests (`routes/`)
- **Public Routes**: Homepage, articles, handbook, lexicon, contributors, about, contact
- **Protected Routes**: Account pages, profile management, role-specific access
- **Navigation**: Header navigation, mobile menu, breadcrumbs
- **Error Handling**: 404 pages, error recovery
- **SEO**: Page titles, meta descriptions, proper heading structure

### Form Tests (`forms/form-tests.cy.ts`)
- **Contact Form**: Validation, submission, error handling, special characters
- **Newsletter Signup**: Email validation, duplicate handling, success flow
- **Profile Update**: Name changes, validation, disabled fields
- **Accessibility**: Proper labels, keyboard navigation, error announcements
- **Security**: XSS prevention, SQL injection protection, input sanitization

### Accessibility Tests (`accessibility/a11y-tests.cy.ts`)
- **WCAG Compliance**: Automated accessibility scanning with axe-core
- **Keyboard Navigation**: Tab order, focus management, skip links
- **Screen Readers**: ARIA labels, landmarks, announcements
- **Color Contrast**: Visual accessibility requirements
- **Responsive**: Mobile, tablet, desktop accessibility
- **Form Accessibility**: Labels, error messages, validation

### User Journey Tests (`journeys/user-journeys.cy.ts`)
- **New User Onboarding**: Discovery to registration workflow
- **Returning User**: Sign-in to content exploration
- **Content Discovery**: Navigation between different content sections
- **Contact & Engagement**: Contact forms, newsletter signup
- **Account Management**: Profile updates, password changes
- **Error Recovery**: Handling and recovering from various error states
- **Cross-device**: Responsive behavior simulation

## Custom Commands

The test suite includes custom Cypress commands for common operations:

### Authentication Commands
- `cy.login(email, password)` - Login via UI
- `cy.loginAsStudent()` - Login with test student account
- `cy.loginAsEducator()` - Login with test educator account
- `cy.loginAsAdmin()` - Login with test admin account
- `cy.loginAsSuperAdmin()` - Login with test super admin account
- `cy.logout()` - Logout current user
- `cy.signup(userData)` - Register new user

### Database Commands
- `cy.seedDatabase()` - Seed test users in database
- `cy.cleanDatabase()` - Clean up test data

### Form Commands
- `cy.submitContactForm(data)` - Fill and submit contact form
- `cy.subscribeToNewsletter(email)` - Subscribe to newsletter

### Navigation Commands
- `cy.visitProtectedRoute(route)` - Visit protected route and handle redirects
- `cy.verifyRoleAccess(route, shouldHaveAccess)` - Test role-based access

### Accessibility Commands
- `cy.checkA11y(options)` - Run accessibility audit
- `cy.auditA11y(context)` - Detailed accessibility report

### Utility Commands
- `cy.waitForPageLoad()` - Wait for page to fully load
- `cy.clearAllData()` - Clear cookies, localStorage, sessionStorage
- `cy.screenshotWithName(name)` - Take named screenshot

## Database Setup

The test suite uses a separate test database to avoid interfering with development data:

### Test Users
- **Student**: `test.student@example.com` / `TestPassword123!`
- **Educator**: `test.educator@example.com` / `TestPassword123!`
- **Admin**: `test.admin@example.com` / `TestPassword123!`
- **Super Admin**: `test.superadmin@example.com` / `TestPassword123!`
- **Unverified**: `test.unverified@example.com` / `TestPassword123!` (email not verified)

### Database Seeding
Tests automatically seed and clean up test data:
- `beforeEach`: Seed test users
- `afterEach`: Clean up test data
- Isolated test runs with consistent data state

## Running Tests

### Local Development
```bash
# Open Cypress Test Runner
pnpm cypress

# Run all tests headlessly
pnpm cypress:run

# Run specific test suites
pnpm cypress:run:auth      # Authentication tests only
pnpm cypress:run:routes    # Route coverage tests only
pnpm cypress:run:forms     # Form tests only
pnpm cypress:run:a11y      # Accessibility tests only
pnpm cypress:run:journeys  # User journey tests only

# Run with specific browsers
pnpm cypress:run:chrome    # Chrome browser
pnpm cypress:run:firefox   # Firefox browser

# Run with development server
pnpm test:e2e             # Start dev server + run tests
```

### CI/CD Pipeline
```bash
# Production build + tests (for CI)
pnpm test:e2e:ci          # Start production server + run tests

# CI-optimized run
pnpm cypress:run:ci       # With recording and CI optimizations
```

## Configuration

### Environment Variables
```bash
# Database
TEST_DATABASE_URL=          # Test database connection string
DATABASE_URL=              # Fallback database URL

# Authentication
BETTER_AUTH_SECRET=        # Auth secret for test environment
NEXT_PUBLIC_PROJECT_URL=   # Base URL for the application

# CI/CD
CI=true                    # Enable CI optimizations
GITHUB_ACTIONS=true        # GitHub Actions specific settings
CYPRESS_BASE_URL=          # Override base URL for tests
```

### CI/CD Optimizations
- Increased timeouts for slower CI environments
- Video recording enabled in CI
- Browser launch arguments for headless Chrome
- Fail-fast behavior for too many failures
- Test result reporting and summaries

## Best Practices

### Test Organization
- Tests organized by feature/functionality
- Clear, descriptive test names
- Proper test isolation with setup/teardown
- Grouped related tests in describe blocks

### Data Management
- Use `data-testid` attributes for reliable element selection
- Clean database state between tests
- Avoid hardcoded delays, use proper waiting strategies
- Test with realistic data that matches production patterns

### Accessibility Testing
- Automated scanning with axe-core
- Manual keyboard navigation verification
- Screen reader compatibility testing
- Color contrast and visual accessibility checks

### Error Handling
- Test both happy path and error scenarios
- Verify graceful error recovery
- Test network failure scenarios
- Validate user-facing error messages

### Performance Considerations
- Tests designed to run efficiently in CI/CD
- Parallel execution support
- Video recording only when needed
- Screenshot capture on failures

## Troubleshooting

### Common Issues

**Database Connection Errors**
- Ensure TEST_DATABASE_URL is properly configured
- Verify database is running and accessible
- Check database permissions for test user creation

**Authentication Failures**
- Verify BETTER_AUTH_SECRET is set correctly
- Check that test users are properly seeded
- Ensure email verification status matches test expectations

**Flaky Tests**
- Use proper waiting strategies instead of fixed delays
- Ensure proper test isolation
- Check for race conditions in async operations

**CI/CD Failures**
- Review video recordings and screenshots
- Check CI-specific timeouts and configurations
- Verify environment variables are properly set

### Debug Mode
```bash
# Run with debug output
DEBUG=cypress:* pnpm cypress:run

# Open specific test file
pnpm cypress --spec "cypress/e2e/auth/authentication.cy.ts"

# Run with browser visible (non-headless)
pnpm cypress:run --headed
```

## Contributing

When adding new tests:

1. **Follow naming conventions**: `*.cy.ts` for test files
2. **Add data-testid attributes**: For new UI elements that need testing
3. **Update custom commands**: If adding reusable test functionality
4. **Include accessibility checks**: Use `cy.checkA11y()` for new pages/flows
5. **Test error scenarios**: Not just happy paths
6. **Document complex tests**: Add comments for non-obvious test logic

### Adding New Test Users
When adding new test user roles, update:
1. `cypress/support/db-seed.ts` - Add user data
2. `cypress.config.ts` - Add environment variables
3. `cypress/support/commands.ts` - Add login command
4. Test files that verify role-based access

This comprehensive test suite ensures the reliability, accessibility, and user experience quality of the Downbeat Academy platform.