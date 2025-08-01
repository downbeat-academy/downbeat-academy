#!/bin/bash

# Script to test Vercel-like build locally
# This simulates a clean build environment similar to Vercel

echo "🧹 Cleaning all build artifacts..."
rm -rf packages/*/dist packages/*/storybook-static
rm -rf packages/cadence-icons/src/components/*.tsx packages/cadence-icons/src/components/*.ts
echo "✅ Clean complete"

echo ""
echo "🏗️  Running full monorepo build..."
pnpm build

if [ $? -eq 0 ]; then
    echo "✅ Base build successful"
else
    echo "❌ Base build failed"
    exit 1
fi

echo ""
echo "📚 Building Storybook..."
cd packages/cadence-core && pnpm build:storybook

if [ $? -eq 0 ]; then
    echo "✅ Storybook build successful"
else
    echo "❌ Storybook build failed"
    exit 1
fi

echo ""
echo "🎉 All builds completed successfully!"