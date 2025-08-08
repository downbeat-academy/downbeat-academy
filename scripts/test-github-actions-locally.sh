#!/bin/bash

# Script to test GitHub Actions locally using act
# Requires: act (brew install act)

echo "🚀 Testing GitHub Actions locally..."

# Create .actrc if it doesn't exist
if [ ! -f ~/.actrc ]; then
  echo "Creating .actrc configuration..."
  cat > ~/.actrc << 'EOF'
--container-architecture linux/amd64
-P ubuntu-latest=catthehacker/ubuntu:act-latest
EOF
fi

# Create .env.test file for GitHub Actions secrets
cat > .env.test << 'EOF'
DATABASE_URL=postgresql://postgres:test_password@localhost:5433/test_db
BETTER_AUTH_SECRET=test-secret-for-ci-testing-only
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_PROJECT_URL=http://localhost:3000
RESEND_API_KEY=test-key
BLOB_READ_WRITE_TOKEN=test-token
NEXT_PUBLIC_SANITY_PROJECT_ID=test-project
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_SECRET_TOKEN=test-token
SENTRY_AUTH_TOKEN=test-token
EOF

# Start the test database
echo "Starting test database..."
docker-compose -f docker-compose.test.yml up -d

# Wait for database to be ready
echo "Waiting for database to be ready..."
sleep 5

# Run specific job
if [ "$1" = "lint" ]; then
  echo "Running lint job..."
  act -j lint --secret-file .env.test
elif [ "$1" = "e2e" ]; then
  echo "Running e2e-tests job..."
  act -j e2e-tests --secret-file .env.test
else
  echo "Running all jobs..."
  act --secret-file .env.test
fi

# Cleanup
echo "Cleaning up..."
docker-compose -f docker-compose.test.yml down
rm -f .env.test

echo "✅ GitHub Actions test completed!"