#!/usr/bin/env tsx

/**
 * Test Debugging Script for Downbeat Academy
 * Checks if the app is running and healthy before running E2E tests
 */

import { execSync } from 'child_process'
import { readFileSync } from 'fs'
import { join } from 'path'

interface HealthCheckOptions {
  baseUrl?: string
  maxRetries?: number
  retryDelay?: number
}

class TestDebugger {
  private baseUrl: string
  private maxRetries: number
  private retryDelay: number

  constructor(options: HealthCheckOptions = {}) {
    this.baseUrl = options.baseUrl || process.env.CYPRESS_BASE_URL || 'http://localhost:3000'
    this.maxRetries = options.maxRetries || 30
    this.retryDelay = options.retryDelay || 2000
  }

  async checkServerHealth(): Promise<boolean> {
    const startTime = Date.now()
    
    console.log('🔍 Checking server health...')
    console.log(`   Base URL: ${this.baseUrl}`)
    console.log(`   Max retries: ${this.maxRetries}`)
    console.log(`   Retry delay: ${this.retryDelay}ms`)

    for (let i = 0; i < this.maxRetries; i++) {
      try {
        const response = await fetch(this.baseUrl, {
          method: 'GET',
          headers: {
            'User-Agent': 'Cypress-Test-Debugger'
          }
        })

        if (response.ok) {
          const elapsed = Date.now() - startTime
          console.log(`✅ Server is healthy! (${response.status}) - took ${elapsed}ms`)
          return true
        } else {
          console.log(`⚠️  Server responded with status ${response.status}`)
        }
      } catch (error: any) {
        if (i === 0) {
          console.log(`🚫 Server not ready yet: ${error.message}`)
        }
        
        if (i < this.maxRetries - 1) {
          console.log(`   Retry ${i + 1}/${this.maxRetries} in ${this.retryDelay}ms...`)
          await this.sleep(this.retryDelay)
        }
      }
    }

    const elapsed = Date.now() - startTime
    console.log(`❌ Server failed to become healthy after ${elapsed}ms`)
    return false
  }

  async checkKeyPages(): Promise<boolean> {
    console.log('🔍 Checking key pages...')
    
    const pages = [
      { path: '/', name: 'Home' },
      { path: '/sign-in', name: 'Sign In' },
      { path: '/api/auth/session', name: 'Auth Session API' }
    ]

    let allPagesHealthy = true

    for (const page of pages) {
      try {
        const response = await fetch(`${this.baseUrl}${page.path}`, {
          method: 'GET',
          headers: {
            'User-Agent': 'Cypress-Test-Debugger'
          }
        })

        if (response.ok) {
          console.log(`✅ ${page.name} (${page.path}): ${response.status}`)
        } else if (response.status === 404 && page.path.includes('/api/')) {
          // API routes might not exist, that's okay
          console.log(`⚠️  ${page.name} (${page.path}): ${response.status} - API might not be available`)
        } else {
          console.log(`❌ ${page.name} (${page.path}): ${response.status}`)
          allPagesHealthy = false
        }
      } catch (error: any) {
        console.log(`❌ ${page.name} (${page.path}): ${error.message}`)
        allPagesHealthy = false
      }
    }

    return allPagesHealthy
  }

  async checkEnvironmentVariables(): Promise<boolean> {
    console.log('🔍 Checking environment variables...')

    const requiredEnvVars = [
      'DATABASE_URL',
      'BETTER_AUTH_SECRET'
    ]

    const cypressEnvVars = [
      'TEST_STUDENT_EMAIL',
      'TEST_STUDENT_PASSWORD',
      'TEST_EDUCATOR_EMAIL',
      'TEST_EDUCATOR_PASSWORD'
    ]

    let allEnvVarsPresent = true

    // Check required environment variables
    for (const envVar of requiredEnvVars) {
      if (process.env[envVar]) {
        console.log(`✅ ${envVar}: Set`)
      } else {
        console.log(`❌ ${envVar}: Missing`)
        allEnvVarsPresent = false
      }
    }

    // Check Cypress environment variables
    try {
      const cypressConfig = await import('../cypress.config')
      const config = cypressConfig.default
      
      for (const envVar of cypressEnvVars) {
        const value = config.e2e?.env?.[envVar]
        if (value) {
          console.log(`✅ ${envVar}: Set in Cypress config`)
        } else {
          console.log(`⚠️  ${envVar}: Missing in Cypress config`)
        }
      }
    } catch (error) {
      console.log('⚠️  Could not load Cypress config to check environment variables')
    }

    return allEnvVarsPresent
  }

  async checkDatabaseConnection(): Promise<boolean> {
    console.log('🔍 Checking database connection...')
    
    try {
      // Try to run the database verification script
      execSync('tsx scripts/verify-test-users.ts', { 
        stdio: 'pipe',
        cwd: process.cwd()
      })
      console.log('✅ Database connection: OK')
      console.log('✅ Test users verification: OK')
      return true
    } catch (error: any) {
      console.log('❌ Database connection or test users: FAILED')
      console.log(`   Error: ${error.message}`)
      
      // Try to run the test setup script
      try {
        console.log('🔧 Attempting to setup test environment...')
        execSync('tsx scripts/setup-test-env.ts', { 
          stdio: 'inherit',
          cwd: process.cwd()
        })
        console.log('✅ Test environment setup completed')
        return true
      } catch (setupError: any) {
        console.log('❌ Test environment setup failed')
        console.log(`   Error: ${setupError.message}`)
        return false
      }
    }
  }

  async checkNodeProcesses(): Promise<void> {
    console.log('🔍 Checking running processes...')
    
    try {
      const processes = execSync('ps aux | grep -E "(node|next|cypress)" | grep -v grep', { 
        encoding: 'utf8' 
      })
      
      if (processes.trim()) {
        console.log('🔍 Found Node/Next.js processes:')
        console.log(processes)
      } else {
        console.log('⚠️  No Node/Next.js processes found running')
      }
    } catch (error) {
      console.log('⚠️  Could not check running processes')
    }
  }

  async checkPortAvailability(): Promise<boolean> {
    console.log('🔍 Checking port availability...')
    
    try {
      const port = new URL(this.baseUrl).port || (this.baseUrl.includes('https') ? '443' : '80')
      const response = await fetch(`${this.baseUrl}`, {
        method: 'GET',
        signal: AbortSignal.timeout(5000)
      })
      
      console.log(`✅ Port ${port} is accessible`)
      return true
    } catch (error: any) {
      const port = new URL(this.baseUrl).port || (this.baseUrl.includes('https') ? '443' : '80')
      
      if (error.name === 'TimeoutError') {
        console.log(`❌ Port ${port}: Timeout - server might be hanging`)
      } else if (error.message.includes('ECONNREFUSED')) {
        console.log(`❌ Port ${port}: Connection refused - server not running`)
      } else {
        console.log(`❌ Port ${port}: ${error.message}`)
      }
      
      return false
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async runFullHealthCheck(): Promise<boolean> {
    console.log('🩺 Starting comprehensive health check...\n')

    const checks = [
      { name: 'Environment Variables', fn: () => this.checkEnvironmentVariables() },
      { name: 'Database Connection', fn: () => this.checkDatabaseConnection() },
      { name: 'Port Availability', fn: () => this.checkPortAvailability() },
      { name: 'Server Health', fn: () => this.checkServerHealth() },
      { name: 'Key Pages', fn: () => this.checkKeyPages() }
    ]

    let allChecksPassed = true

    for (const check of checks) {
      console.log(`\n--- ${check.name} ---`)
      try {
        const result = await check.fn()
        if (!result) {
          allChecksPassed = false
        }
      } catch (error: any) {
        console.log(`❌ ${check.name} failed: ${error.message}`)
        allChecksPassed = false
      }
    }

    // Always check running processes (informational only)
    console.log('\n--- Running Processes ---')
    await this.checkNodeProcesses()

    console.log('\n🏁 Health check complete!')
    
    if (allChecksPassed) {
      console.log('✅ All checks passed - ready for testing!')
    } else {
      console.log('❌ Some checks failed - fix issues before running tests')
    }

    return allChecksPassed
  }
}

// CLI interface
async function main() {
  const args = process.argv.slice(2)
  const isVerbose = args.includes('--verbose') || args.includes('-v')
  const baseUrl = args.find(arg => arg.startsWith('--url='))?.split('=')[1]

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Test Health Checker for Downbeat Academy

Usage: tsx scripts/debug-test-health.ts [options]

Options:
  --url=<url>     Override base URL (default: http://localhost:3000)
  --verbose, -v   Enable verbose output
  --help, -h      Show this help message

Examples:
  tsx scripts/debug-test-health.ts
  tsx scripts/debug-test-health.ts --url=http://localhost:3001
  tsx scripts/debug-test-health.ts --verbose
`)
    process.exit(0)
  }

  const testDebugger = new TestDebugger({ baseUrl })
  
  const isHealthy = await testDebugger.runFullHealthCheck()
  
  process.exit(isHealthy ? 0 : 1)
}

if (require.main === module) {
  main().catch(error => {
    console.error('❌ Health check failed:', error)
    process.exit(1)
  })
}

export { TestDebugger }