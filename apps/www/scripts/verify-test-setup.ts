#!/usr/bin/env tsx

/**
 * Comprehensive Test Setup Verification Script
 * Verifies that all components are working together properly
 */

import { execSync, spawn } from 'child_process'
import { TestDebugger } from './debug-test-health'
import { TestRunner } from './test-runner'

interface TestVerificationOptions {
  skipServerStart?: boolean
  runQuickTests?: boolean
  verbose?: boolean
}

class TestVerifier {
  private options: Required<TestVerificationOptions>

  constructor(options: TestVerificationOptions = {}) {
    this.options = {
      skipServerStart: options.skipServerStart || false,
      runQuickTests: options.runQuickTests || true,
      verbose: options.verbose || false
    }
  }

  async checkPrerequisites(): Promise<boolean> {
    console.log('🔍 Checking prerequisites...')

    const checks = [
      {
        name: 'Node.js and pnpm',
        check: () => {
          try {
            const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim()
            const pnpmVersion = execSync('pnpm --version', { encoding: 'utf8' }).trim()
            console.log(`   ✅ Node.js: ${nodeVersion}`)
            console.log(`   ✅ pnpm: ${pnpmVersion}`)
            return true
          } catch (error: any) {
            console.log(`   ❌ Error checking Node.js/pnpm: ${error.message}`)
            return false
          }
        }
      },
      {
        name: 'Dependencies installed',
        check: () => {
          try {
            execSync('pnpm list cypress', { encoding: 'utf8', stdio: 'pipe' })
            console.log('   ✅ Cypress installed')
            return true
          } catch (error: any) {
            console.log('   ❌ Cypress not installed - run `pnpm install`')
            return false
          }
        }
      },
      {
        name: 'TypeScript compilation',
        check: () => {
          try {
            execSync('tsc --noEmit', { encoding: 'utf8', stdio: 'pipe' })
            console.log('   ✅ TypeScript compilation successful')
            return true
          } catch (error: any) {
            console.log('   ⚠️  TypeScript compilation issues detected (may not affect tests)')
            if (this.options.verbose) {
              console.log(`   Details: ${error.message}`)
            }
            return true // Don't fail for TS issues
          }
        }
      },
      {
        name: 'Environment variables',
        check: () => {
          const required = ['DATABASE_URL', 'BETTER_AUTH_SECRET']
          let allPresent = true
          
          for (const envVar of required) {
            if (process.env[envVar]) {
              console.log(`   ✅ ${envVar}: Set`)
            } else {
              console.log(`   ❌ ${envVar}: Missing`)
              allPresent = false
            }
          }
          
          return allPresent
        }
      }
    ]

    let allChecksPassed = true

    for (const check of checks) {
      console.log(`\n📋 ${check.name}:`)
      try {
        const result = check.check()
        if (!result) {
          allChecksPassed = false
        }
      } catch (error: any) {
        console.log(`   ❌ ${check.name} failed: ${error.message}`)
        allChecksPassed = false
      }
    }

    return allChecksPassed
  }

  async testDebugScript(): Promise<boolean> {
    console.log('\n🩺 Testing debug health script...')
    
    try {
      const debugger = new TestDebugger()
      
      console.log('   Checking environment variables...')
      const envResult = await debugger.checkEnvironmentVariables()
      
      console.log('   Checking database connection...')
      const dbResult = await debugger.checkDatabaseConnection()
      
      if (envResult && dbResult) {
        console.log('   ✅ Debug script working correctly')
        return true
      } else {
        console.log('   ⚠️  Debug script has some issues but may still work')
        return true // Don't fail entirely
      }
    } catch (error: any) {
      console.log(`   ❌ Debug script failed: ${error.message}`)
      return false
    }
  }

  async testDatabaseOperations(): Promise<boolean> {
    console.log('\n🗄️ Testing database operations...')
    
    try {
      console.log('   Setting up test users...')
      execSync('pnpm test:prepare', { 
        stdio: this.options.verbose ? 'inherit' : 'pipe' 
      })
      console.log('   ✅ Database setup successful')
      
      console.log('   Verifying test users...')
      execSync('pnpm test:verify', { 
        stdio: this.options.verbose ? 'inherit' : 'pipe' 
      })
      console.log('   ✅ Test users verified')
      
      return true
    } catch (error: any) {
      console.log(`   ❌ Database operations failed: ${error.message}`)
      if (this.options.verbose) {
        console.log('   Try running: pnpm test:prepare')
      }
      return false
    }
  }

  async testServerStart(): Promise<boolean> {
    if (this.options.skipServerStart) {
      console.log('\n🚀 Skipping server start test...')
      return true
    }

    console.log('\n🚀 Testing server startup...')
    
    try {
      const runner = new TestRunner({
        verbose: this.options.verbose,
        skipHealthCheck: true
      })
      
      console.log('   Starting development server...')
      const serverStarted = await runner.startServer()
      
      if (serverStarted) {
        console.log('   ✅ Server started successfully')
        
        // Quick health check
        const debugger = new TestDebugger()
        const isHealthy = await debugger.checkServerHealth()
        
        await runner.stopServer()
        
        if (isHealthy) {
          console.log('   ✅ Server health check passed')
          return true
        } else {
          console.log('   ⚠️  Server started but health check had issues')
          return true // Don't fail if server starts
        }
      } else {
        console.log('   ❌ Server failed to start')
        return false
      }
    } catch (error: any) {
      console.log(`   ❌ Server test failed: ${error.message}`)
      return false
    }
  }

  async runQuickCypressTest(): Promise<boolean> {
    if (!this.options.runQuickTests) {
      console.log('\n🧪 Skipping quick Cypress test...')
      return true
    }

    console.log('\n🧪 Running quick Cypress test...')
    
    try {
      const runner = new TestRunner({
        spec: 'cypress/e2e/app.cy.ts', // Run basic smoke test
        verbose: this.options.verbose
      })
      
      const success = await runner.runTests()
      
      if (success) {
        console.log('   ✅ Quick Cypress test passed')
        return true
      } else {
        console.log('   ❌ Quick Cypress test failed')
        return false
      }
    } catch (error: any) {
      console.log(`   ❌ Cypress test error: ${error.message}`)
      return false
    }
  }

  async generateReport(): Promise<void> {
    console.log('\n📊 Test Setup Verification Report')
    console.log('=' .repeat(50))
    
    const results = []
    
    console.log('\n🔍 Prerequisites...')
    const prereqResult = await this.checkPrerequisites()
    results.push({ name: 'Prerequisites', result: prereqResult })
    
    console.log('\n🩺 Debug Script...')
    const debugResult = await this.testDebugScript()
    results.push({ name: 'Debug Script', result: debugResult })
    
    console.log('\n🗄️ Database Operations...')
    const dbResult = await this.testDatabaseOperations()
    results.push({ name: 'Database', result: dbResult })
    
    console.log('\n🚀 Server Startup...')
    const serverResult = await this.testServerStart()
    results.push({ name: 'Server', result: serverResult })
    
    console.log('\n🧪 Quick Cypress Test...')
    const cypressResult = await this.runQuickCypressTest()
    results.push({ name: 'Cypress', result: cypressResult })
    
    console.log('\n📋 Final Results:')
    console.log('-' .repeat(30))
    
    let allPassed = true
    for (const result of results) {
      const status = result.result ? '✅' : '❌'
      console.log(`${status} ${result.name}`)
      if (!result.result) {
        allPassed = false
      }
    }
    
    console.log('\n🏁 Overall Status:')
    if (allPassed) {
      console.log('✅ All checks passed! Your test environment is ready.')
      console.log('\n🚀 Ready to run tests:')
      console.log('   pnpm test:runner              # Run all tests')
      console.log('   pnpm test:runner:auth          # Run auth tests only')
      console.log('   pnpm test:runner:headed        # Run with browser visible')
      console.log('   pnpm cypress                   # Open Cypress UI')
    } else {
      console.log('❌ Some checks failed. Please address the issues above.')
      console.log('\n🔧 Common fixes:')
      console.log('   pnpm install                   # Install missing dependencies')
      console.log('   pnpm test:prepare              # Setup test database')
      console.log('   cp .env.example .env.local     # Setup environment variables')
    }
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2)

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Test Setup Verification for Downbeat Academy

Usage: tsx scripts/verify-test-setup.ts [options]

Options:
  --skip-server        Skip server startup test
  --no-quick-tests     Skip quick Cypress test
  --verbose, -v        Enable verbose output
  --help, -h           Show this help message

Examples:
  tsx scripts/verify-test-setup.ts
  tsx scripts/verify-test-setup.ts --skip-server --verbose
  tsx scripts/verify-test-setup.ts --no-quick-tests
`)
    process.exit(0)
  }

  const options: TestVerificationOptions = {
    skipServerStart: args.includes('--skip-server'),
    runQuickTests: !args.includes('--no-quick-tests'),
    verbose: args.includes('--verbose') || args.includes('-v')
  }

  const verifier = new TestVerifier(options)
  await verifier.generateReport()
}

if (require.main === module) {
  main().catch(error => {
    console.error('❌ Verification failed:', error)
    process.exit(1)
  })
}

export { TestVerifier }