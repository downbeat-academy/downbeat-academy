#!/bin/bash

# E2E Test Runner Script for Local Development
# This script sets up and runs the E2E tests locally

set -e

echo "🚀 Starting E2E Test Setup..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
check_prerequisites() {
    echo "Checking prerequisites..."
    
    if ! command -v docker &> /dev/null; then
        echo -e "${RED}❌ Docker is not installed. Please install Docker first.${NC}"
        exit 1
    fi
    
    if ! command -v pnpm &> /dev/null; then
        echo -e "${RED}❌ pnpm is not installed. Please install pnpm first.${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✅ All prerequisites met!${NC}"
}

# Start test database
start_database() {
    echo "Starting test database..."
    cd /Users/jorytindall/projects/downbeatacademy
    docker compose -f docker-compose.test.yml up -d
    
    # Wait for database to be ready
    echo "Waiting for database to be ready..."
    for i in {1..30}; do
        if docker compose -f docker-compose.test.yml exec -T postgres-test pg_isready -U postgres &> /dev/null; then
            echo -e "${GREEN}✅ Database is ready!${NC}"
            return 0
        fi
        echo -n "."
        sleep 1
    done
    
    echo -e "${RED}❌ Database failed to start${NC}"
    exit 1
}

# Setup environment
setup_environment() {
    echo "Setting up test environment..."
    cd /Users/jorytindall/projects/downbeatacademy/apps/www
    
    # Create test env file
    cat > .env.test.local << 'EOF'
DATABASE_URL=postgresql://postgres:test_password@localhost:5433/test_db
BETTER_AUTH_SECRET=test-secret-for-local-testing
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_PROJECT_URL=http://localhost:3000
RESEND_API_KEY=test-key
BLOB_READ_WRITE_TOKEN=test-token
NEXT_PUBLIC_SANITY_PROJECT_ID=test-project
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_SECRET_TOKEN=test-token
SENTRY_AUTH_TOKEN=test-token
NEXT_PUBLIC_SENTRY_DSN=
NEXT_PUBLIC_SENTRY_PROJECT=
NEXT_PUBLIC_FATHOM_SITE_ID=
EOF
    
    echo -e "${GREEN}✅ Environment configured!${NC}"
}

# Build packages
build_packages() {
    echo "Building required packages..."
    cd /Users/jorytindall/projects/downbeatacademy
    
    pnpm --filter cadence-tokens build
    pnpm --filter cadence-icons build
    pnpm --filter cadence-core build
    
    echo -e "${GREEN}✅ Packages built!${NC}"
}

# Setup database
setup_database() {
    echo "Setting up database schema..."
    cd /Users/jorytindall/projects/downbeatacademy/apps/www
    
    DATABASE_URL=postgresql://postgres:test_password@localhost:5433/test_db pnpm db:push
    
    # Seed test data if script exists
    if [ -f "cypress/support/db-seed.ts" ]; then
        echo "Seeding test data..."
        DATABASE_URL=postgresql://postgres:test_password@localhost:5433/test_db pnpm db:seed:test
    fi
    
    echo -e "${GREEN}✅ Database setup complete!${NC}"
}

# Run tests
run_tests() {
    echo "Running E2E tests..."
    cd /Users/jorytindall/projects/downbeatacademy/apps/www
    
    case "${1:-all}" in
        "auth")
            echo "Running authentication tests..."
            pnpm cypress:run:auth
            ;;
        "routes")
            echo "Running route coverage tests..."
            pnpm cypress:run:routes
            ;;
        "forms")
            echo "Running form tests..."
            pnpm cypress:run:forms
            ;;
        "a11y")
            echo "Running accessibility tests..."
            pnpm cypress:run:a11y
            ;;
        "journeys")
            echo "Running user journey tests..."
            pnpm cypress:run:journeys
            ;;
        "interactive")
            echo "Opening Cypress Test Runner..."
            pnpm cypress
            ;;
        "ci")
            echo "Running tests in CI mode..."
            pnpm build
            pnpm test:e2e:ci
            ;;
        *)
            echo "Running all tests..."
            pnpm test:e2e
            ;;
    esac
}

# Cleanup
cleanup() {
    echo "Cleaning up..."
    cd /Users/jorytindall/projects/downbeatacademy
    docker compose -f docker-compose.test.yml down
    rm -f apps/www/.env.test.local
    echo -e "${GREEN}✅ Cleanup complete!${NC}"
}

# Main execution
main() {
    check_prerequisites
    
    # Set up trap to cleanup on exit
    trap cleanup EXIT
    
    start_database
    setup_environment
    build_packages
    setup_database
    run_tests "$1"
    
    echo -e "${GREEN}✅ E2E tests completed successfully!${NC}"
}

# Show help
show_help() {
    echo "Usage: $0 [test-suite]"
    echo ""
    echo "Available test suites:"
    echo "  auth         - Run authentication tests only"
    echo "  routes       - Run route coverage tests only"
    echo "  forms        - Run form tests only"
    echo "  a11y         - Run accessibility tests only"
    echo "  journeys     - Run user journey tests only"
    echo "  interactive  - Open Cypress Test Runner"
    echo "  ci           - Run tests in CI mode (with production build)"
    echo "  all          - Run all tests (default)"
    echo ""
    echo "Examples:"
    echo "  $0              # Run all tests"
    echo "  $0 auth         # Run auth tests only"
    echo "  $0 interactive  # Open Cypress GUI"
}

# Parse arguments
if [ "$1" = "--help" ] || [ "$1" = "-h" ]; then
    show_help
    exit 0
fi

# Run main function
main "$1"