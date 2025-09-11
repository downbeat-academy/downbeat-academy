#!/usr/bin/env tsx

/**
 * Authentication Test Runner
 * Specifically handles authentication test setup, server management, and execution
 */

import { spawn, exec, execSync, ChildProcess } from 'child_process'
import { join } from 'path'
import { config } from 'dotenv'

// Load environment variables from .env.local
config({ path: '.env.local' })

interface AuthTestOptions {
  baseUrl?: string
  mode?: 'dev' | 'start'
  browser?: string
  headed?: boolean
  verbose?: boolean
  skipPrep?: boolean
}

class AuthTestRunner {
  private options: Required<AuthTestOptions>
  private serverProcess: ChildProcess | null = null

  constructor(options: AuthTestOptions = {}) {
    this.options = {
      baseUrl: options.baseUrl || 'http://localhost:3000',
      mode: options.mode || 'dev',
      browser: options.browser || 'chrome',
      headed: options.headed || false,
      verbose: options.verbose || false,
      skipPrep: options.skipPrep || false
    }
  }

  private async waitForServer(url: string, timeout: number = 60000): Promise<boolean> {
    const startTime = Date.now()
    const checkInterval = 2000

    console.log(`🔍 Waiting for server at ${url}...`)

    while (Date.now() - startTime < timeout) {
      try {
        const response = await fetch(url)
        if (response.ok) {
          console.log(`✅ Server is responding at ${url}`)
          return true
        }
      } catch (error) {
        // Server not ready yet, continue waiting
      }

      await new Promise(resolve => setTimeout(resolve, checkInterval))
    }

    console.log(`❌ Server not responsive after ${timeout}ms`)
    return false
  }

  async startServer(): Promise<boolean> {
    console.log(`🚀 Starting Next.js server in ${this.options.mode} mode...`)

    return new Promise((resolve) => {
      const command = this.options.mode === 'dev' ? 'pnpm dev' : 'pnpm start'
      
      this.serverProcess = spawn('bash', ['-c', command], {
        cwd: process.cwd(),
        stdio: this.options.verbose ? 'inherit' : ['ignore', 'pipe', 'pipe'],
        env: { ...process.env }
      })

      let serverStarted = false

      // Handle stdout
      if (this.serverProcess.stdout) {
        this.serverProcess.stdout.on('data', (data) => {
          const output = data.toString()
          
          if (this.options.verbose) {
            console.log(output.trim())
          }

          // Check for port detection - Next.js outputs "Local: http://localhost:XXXX"
          const portMatch = output.match(/Local:\s+http:\/\/localhost:(\d+)/)
          if (portMatch) {
            const detectedPort = portMatch[1]
            const detectedUrl = `http://localhost:${detectedPort}`
            console.log(`🔍 Detected server running on ${detectedUrl}`)
            // Update our base URL to match the actual server
            this.options.baseUrl = detectedUrl
          }

          // Check for startup success indicators
          if (!serverStarted && (
            output.includes('Ready') ||
            output.includes('started server') ||
            output.includes('Local:') ||
            output.includes('ready in')
          )) {
            serverStarted = true
            console.log('✅ Server startup detected')
            
            // Wait a bit more then check if server is actually responding
            setTimeout(async () => {
              const isResponding = await this.waitForServer(this.options.baseUrl)
              resolve(isResponding)
            }, 3000)
          }
        })
      }

      // Handle stderr
      if (this.serverProcess.stderr) {
        this.serverProcess.stderr.on('data', (data) => {
          const error = data.toString()
          if (this.options.verbose || error.includes('Error')) {
            console.error('Server Error:', error.trim())
          }
        })
      }

      // Handle process exit
      this.serverProcess.on('exit', (code, signal) => {
        if (!serverStarted) {
          console.log(`❌ Server exited early with code ${code} and signal ${signal}`)
          resolve(false)
        }
      })

      this.serverProcess.on('error', (error) => {
        console.log(`❌ Server process error: ${error.message}`)
        resolve(false)
      })

      // Timeout fallback - check server response anyway
      setTimeout(async () => {
        if (!serverStarted) {
          console.log('⏰ Server startup timeout, checking if server is responding anyway...')
          const isResponding = await this.waitForServer(this.options.baseUrl)
          resolve(isResponding)
        }
      }, 45000)
    })
  }

  async stopServer(): Promise<void> {
    if (this.serverProcess) {
      console.log('🛑 Stopping server...')
      
      // Try graceful shutdown first
      this.serverProcess.kill('SIGTERM')
      
      // Force kill after 5 seconds if still running
      setTimeout(() => {
        if (this.serverProcess && !this.serverProcess.killed) {
          console.log('🔨 Force killing server process...')
          this.serverProcess.kill('SIGKILL')
        }
      }, 5000)

      this.serverProcess = null
    }
  }

  async prepareDatabase(): Promise<boolean> {
    console.log('📊 Preparing authentication test database...')

    try {
      // Clean and seed test database
      console.log('🧹 Cleaning up existing test users...')
      execSync('pnpm db:seed:test', { 
        stdio: this.options.verbose ? 'inherit' : 'pipe',
        cwd: process.cwd()
      })
      
      console.log('✅ Test database prepared')
      return true
    } catch (error: any) {
      console.log('❌ Failed to prepare test database:')
      console.log(error.message)
      
      // Try running test preparation separately
      try {
        console.log('🔄 Trying alternative database setup...')
        execSync('pnpm test:setup', { 
          stdio: this.options.verbose ? 'inherit' : 'pipe',
          cwd: process.cwd()
        })
        console.log('✅ Alternative database setup succeeded')
        return true
      } catch (altError) {
        console.log('❌ Alternative database setup also failed')
        return false
      }
    }
  }

  async runAuthTests(): Promise<boolean> {
    console.log('🔐 Running authentication tests...')

    // Build the cypress run command with proper arguments
    let command = 'pnpm cypress:run'
    
    // Add browser option
    command += ` --browser ${this.options.browser}`
    
    // Run only auth tests
    command += ` --spec "cypress/e2e/auth/**/*.cy.ts"`
    
    // Add headed option
    if (this.options.headed) {
      command += ' --headed'
    }

    // Environment variables
    const env = {
      ...process.env,
      CYPRESS_BASE_URL: this.options.baseUrl,
    }

    return new Promise((resolve) => {
      console.log('🧪 Executing Cypress auth tests...')
      console.log(`Command: ${command}`)
      
      const cypressProcess = spawn('bash', ['-c', command], {
        cwd: process.cwd(),
        stdio: 'inherit',
        env
      })

      cypressProcess.on('exit', (code) => {
        const success = code === 0
        if (success) {
          console.log('✅ All authentication tests passed!')
        } else {
          console.log(`❌ Authentication tests failed with exit code ${code}`)
        }
        resolve(success)
      })

      cypressProcess.on('error', (error) => {
        console.log(`❌ Cypress process error: ${error.message}`)
        resolve(false)
      })
    })
  }

  async runFullAuthTestSuite(): Promise<boolean> {
    console.log('🎭 Starting authentication test suite...\n')

    let success = true

    try {
      // Step 1: Prepare database (unless skipped)
      if (!this.options.skipPrep) {
        if (!await this.prepareDatabase()) {
          console.log('❌ Database preparation failed')
          return false
        }
      } else {
        console.log('⏭️  Skipping database preparation')
      }

      // Step 2: Start the server
      const serverStarted = await this.startServer()
      if (!serverStarted) {
        console.log('❌ Server failed to start')
        return false
      }

      // Small delay to ensure everything is ready
      console.log('⏳ Waiting for system to stabilize...')
      await new Promise(resolve => setTimeout(resolve, 3000))

      // Step 3: Run authentication tests
      const testsSuccess = await this.runAuthTests()
      if (!testsSuccess) {
        success = false
      }

    } catch (error: any) {
      console.log(`❌ Authentication test run failed: ${error.message}`)
      success = false
    } finally {
      // Always stop the server
      await this.stopServer()
    }

    console.log('\n🏁 Authentication test suite completed!')
    return success
  }
}

// CLI Interface
async function main() {
  const args = process.argv.slice(2)

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Authentication Test Runner for Downbeat Academy

Usage: tsx scripts/auth-test-runner.ts [options]

Options:
  --mode=<dev|start>     Server mode (default: dev)
  --browser=<name>       Browser to use (default: chrome)
  --headed              Run tests in headed mode
  --verbose, -v         Enable verbose output
  --skip-prep           Skip database preparation
  --url=<url>          Override base URL (default: http://localhost:3000)
  --help, -h           Show this help message

Examples:
  tsx scripts/auth-test-runner.ts
  tsx scripts/auth-test-runner.ts --mode=start --headed
  tsx scripts/auth-test-runner.ts --verbose --skip-prep
`)
    process.exit(0)
  }

  const options: AuthTestOptions = {
    mode: args.find(arg => arg.startsWith('--mode='))?.split('=')[1] as 'dev' | 'start' || 'dev',
    browser: args.find(arg => arg.startsWith('--browser='))?.split('=')[1] || 'chrome',
    baseUrl: args.find(arg => arg.startsWith('--url='))?.split('=')[1] || 'http://localhost:3000',
    headed: args.includes('--headed'),
    verbose: args.includes('--verbose') || args.includes('-v'),
    skipPrep: args.includes('--skip-prep')
  }

  console.log('🔐 Authentication Test Runner Configuration:')
  console.log(`   Mode: ${options.mode}`)
  console.log(`   Base URL: ${options.baseUrl}`)
  console.log(`   Browser: ${options.browser}`)
  console.log(`   Headed: ${options.headed}`)
  console.log(`   Verbose: ${options.verbose}`)
  console.log(`   Skip Preparation: ${options.skipPrep}`)
  console.log('')

  const runner = new AuthTestRunner(options)
  
  // Handle graceful shutdown
  process.on('SIGINT', async () => {
    console.log('\n🛑 Received SIGINT, shutting down gracefully...')
    await runner.stopServer()
    process.exit(1)
  })

  process.on('SIGTERM', async () => {
    console.log('\n🛑 Received SIGTERM, shutting down gracefully...')
    await runner.stopServer()
    process.exit(1)
  })

  const success = await runner.runFullAuthTestSuite()
  process.exit(success ? 0 : 1)
}

if (require.main === module) {
  main().catch(error => {
    console.error('❌ Authentication test runner failed:', error)
    process.exit(1)
  })
}

export { AuthTestRunner }