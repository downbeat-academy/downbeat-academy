# Local Testing Guide for E2E Tests

This guide explains how to run the E2E tests locally and test the GitHub Actions workflow on your machine.

## Prerequisites

- Docker installed and running
- Node.js 18+ and pnpm installed
- PostgreSQL client tools (optional, for debugging)

## Running E2E Tests Locally

### 1. Quick Start

```bash
# From the monorepo root
cd apps/www

# Start test database
docker-compose -f ../../docker-compose.test.yml up -d

# Install dependencies
pnpm install

# Build required packages
pnpm --filter cadence-tokens build
pnpm --filter cadence-icons build
pnpm --filter cadence-core build

# Set up test environment
cp .env.example .env.test.local
# Edit .env.test.local and set:
# DATABASE_URL=postgresql://postgres:test_password@localhost:5433/test_db

# Run database migrations
DATABASE_URL=postgresql://postgres:test_password@localhost:5433/test_db pnpm db:push

# Run tests with dev server
pnpm test:e2e

# Or run specific test suites
pnpm cypress:run:auth      # Authentication tests only
pnpm cypress:run:routes    # Route coverage tests only
pnpm cypress:run:forms     # Form tests only
pnpm cypress:run:a11y      # Accessibility tests only
pnpm cypress:run:journeys  # User journey tests only
```

### 2. Interactive Testing

```bash
# Open Cypress Test Runner for interactive testing
pnpm cypress

# Select E2E Testing
# Choose a browser
# Run individual test files
```

### 3. Production Build Testing

```bash
# Build the app
pnpm build

# Run tests against production build
pnpm test:e2e:ci
```

## Testing GitHub Actions Locally

### Using Act (Recommended)

[Act](https://github.com/nektos/act) runs your GitHub Actions locally.

#### Installation

```bash
# macOS
brew install act

# Linux
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash

# Windows (via Chocolatey)
choco install act-cli
```

#### Running Actions

```bash
# From monorepo root
./scripts/test-github-actions-locally.sh        # Run all jobs
./scripts/test-github-actions-locally.sh lint   # Run lint job only
./scripts/test-github-actions-locally.sh e2e    # Run e2e-tests job only
```

#### Manual Act Commands

```bash
# List all jobs
act -l

# Run specific job
act -j e2e-tests

# Run with specific event
act pull_request

# Run with secrets file
act -j e2e-tests --secret-file .env.test
```

### Using Docker Compose

If you prefer not to use Act, you can simulate the CI environment:

```bash
# Start test database
docker-compose -f docker-compose.test.yml up -d

# Create test environment
cat > apps/www/.env.test.local << 'EOF'
DATABASE_URL=postgresql://postgres:test_password@localhost:5433/test_db
BETTER_AUTH_SECRET=test-secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_PROJECT_URL=http://localhost:3000
# ... other required env vars
EOF

# Run the same steps as CI
cd apps/www
pnpm install
pnpm db:push
pnpm build
pnpm test:e2e:ci
```

## Troubleshooting

### Database Connection Issues

```bash
# Check if database is running
docker ps | grep postgres-test

# Check database logs
docker logs $(docker ps -q -f name=postgres-test)

# Test connection
psql -h localhost -p 5433 -U postgres -d test_db
# Password: test_password
```

### Port Conflicts

If port 5433 is already in use:

1. Edit `docker-compose.test.yml`
2. Change the port mapping (e.g., `5434:5432`)
3. Update DATABASE_URL in your .env files

### Cypress Issues

```bash
# Clear Cypress cache
pnpm cypress cache clear

# Reinstall Cypress
pnpm remove cypress && pnpm add -D cypress

# Verify Cypress installation
pnpm cypress verify
```

### Act Issues

```bash
# Use different Docker image
act -P ubuntu-latest=catthehacker/ubuntu:act-latest

# Increase resources
act --container-options "--memory=4g --cpus=2"

# Debug mode
act -j e2e-tests -v
```

## Environment Variables

Required environment variables for testing:

```env
# Database
DATABASE_URL=postgresql://postgres:test_password@localhost:5433/test_db

# Authentication
BETTER_AUTH_SECRET=any-secret-for-testing
BETTER_AUTH_URL=http://localhost:3000

# Application
NEXT_PUBLIC_PROJECT_URL=http://localhost:3000

# Email (can be test values)
RESEND_API_KEY=test-key

# Optional services (can be empty for testing)
BLOB_READ_WRITE_TOKEN=
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_SECRET_TOKEN=
SENTRY_AUTH_TOKEN=
NEXT_PUBLIC_SENTRY_DSN=
NEXT_PUBLIC_SENTRY_PROJECT=
NEXT_PUBLIC_FATHOM_SITE_ID=
```

## Best Practices

1. **Always use a separate test database** - Never run tests against your development database
2. **Clean state between runs** - The test suite automatically cleans up, but you can manually reset:
   ```bash
   docker-compose -f docker-compose.test.yml down -v
   docker-compose -f docker-compose.test.yml up -d
   ```
3. **Run tests in CI mode before pushing** - This catches issues that only appear in production builds
4. **Use the same Node version as CI** - Check `.github/workflows/ci-www.yml` for the version

## Continuous Integration

The GitHub Actions workflow runs automatically on:
- Push to `main` branch
- All pull requests

You can view the test results in the GitHub Actions tab of the repository.