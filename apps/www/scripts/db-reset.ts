#!/usr/bin/env tsx

/**
 * Database Reset Script
 * Cleans and re-seeds test database
 */

import { cleanupTestUsers, seedTestUsers, closeDbConnection } from '../cypress/support/db-seed'

async function main() {
  const args = process.argv.slice(2)
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Database Reset Script for Authentication Tests

Usage: tsx scripts/db-reset.ts [options]

Options:
  --cleanup-only    Only cleanup existing test users
  --seed-only       Only seed test users (skip cleanup)
  --help, -h        Show this help message

Examples:
  tsx scripts/db-reset.ts              # Full cleanup and seed
  tsx scripts/db-reset.ts --cleanup-only
  tsx scripts/db-reset.ts --seed-only
`)
    process.exit(0)
  }

  const cleanupOnly = args.includes('--cleanup-only')
  const seedOnly = args.includes('--seed-only')

  try {
    console.log('🔄 Database Reset Started...\n')

    if (!seedOnly) {
      console.log('🧹 Cleaning up existing test users...')
      await cleanupTestUsers()
      console.log('✅ Cleanup completed')
      
      if (cleanupOnly) {
        console.log('\n✨ Database cleanup completed successfully!')
        process.exit(0)
      }
    }

    if (!cleanupOnly) {
      console.log('🌱 Seeding test users...')
      await seedTestUsers()
      console.log('✅ Seeding completed')
    }

    console.log('\n✨ Database reset completed successfully!')
    
  } catch (error: any) {
    console.error('❌ Database reset failed:', error.message)
    process.exit(1)
  } finally {
    await closeDbConnection()
  }
}

if (require.main === module) {
  main().catch(error => {
    console.error('❌ Database reset script failed:', error)
    process.exit(1)
  })
}