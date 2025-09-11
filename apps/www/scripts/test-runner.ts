#!/usr/bin/env tsx

/**
 * Test Runner Script for Downbeat Academy
 * Properly starts the server, runs health checks, and executes Cypress tests
 */

import { spawn, exec, execSync, ChildProcess } from 'child_process'
import { TestDebugger } from './debug-test-health'
import { join } from 'path'
import { readFileSync } from 'fs'

interface TestRunnerOptions {
  baseUrl?: string
  mode?: 'dev' | 'start'
  spec?: string
  browser?: string
  headed?: boolean
  verbose?: boolean
  skipHealthCheck?: boolean
}

class TestRunner {
  private options: Required<TestRunnerOptions>
  private serverProcess: ChildProcess | null = null
  private debugger: TestDebugger

  constructor(options: TestRunnerOptions = {}) {
    this.options = {
      baseUrl: options.baseUrl || 'http://localhost:3000',
      mode: options.mode || 'dev',
      spec: options.spec || '',
      browser: options.browser || 'chrome',
      headed: options.headed || false,
      verbose: options.verbose || false,
      skipHealthCheck: options.skipHealthCheck || false
    }

    this.debugger = new TestDebugger({ baseUrl: this.options.baseUrl })
  }

  async startServer(): Promise<boolean> {
    console.log(`🚀 Starting Next.js server in ${this.options.mode} mode...`)

    return new Promise((resolve) => {
      const command = this.options.mode === 'dev' ? 'pnpm dev' : 'pnpm start'
      
      this.serverProcess = spawn('bash', ['-c', command], {
        cwd: process.cwd(),
        stdio: this.options.verbose ? 'inherit' : 'pipe',
        env: { ...process.env }
      })

      let serverStarted = false
      let startupBuffer = ''

      // Handle stdout
      if (this.serverProcess.stdout) {
        this.serverProcess.stdout.on('data', (data) => {
          const output = data.toString()
          startupBuffer += output
          
          if (this.options.verbose) {
            console.log(output.trim())
          }

          // Check for various startup success indicators
          if (!serverStarted && (
            output.includes('Ready') ||
            output.includes('started server') ||
            output.includes('Local:') ||
            output.includes('ready in')
          )) {
            serverStarted = true
            console.log('✅ Server appears to be ready')
            
            // Give it a moment to fully initialize
            setTimeout(() => resolve(true), 2000)
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
          console.log(`❌ Server exited with code ${code} and signal ${signal}`)
          resolve(false)
        }
      })

      this.serverProcess.on('error', (error) => {
        console.log(`❌ Server process error: ${error.message}`)
        resolve(false)
      })

      // Timeout fallback
      setTimeout(() => {
        if (!serverStarted) {
          console.log('⏰ Server startup timeout - checking health anyway...')
          resolve(false)
        }
      }, 60000) // 60 second timeout
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

  async prepareTestEnvironment(): Promise<boolean> {
    console.log('🔧 Preparing test environment...')

    try {
      // Ensure test database is setup
      console.log('📊 Setting up test database...')
      execSync('pnpm test:prepare', { 
        stdio: this.options.verbose ? 'inherit' : 'pipe',
        cwd: process.cwd()
      })
      console.log('✅ Test database prepared')

      return true
    } catch (error: any) {
      console.log('❌ Failed to prepare test environment:')
      console.log(error.message)
      return false
    }
  }

  async runCypressTests(): Promise<boolean> {
    console.log('🧪 Running Cypress tests...')

    const cypressArgs = ['cypress', 'run']
    
    // Add browser option
    cypressArgs.push('--browser', this.options.browser)
    
    // Add spec if specified
    if (this.options.spec) {
      cypressArgs.push('--spec', this.options.spec)
    }
    
    // Add headed option
    if (this.options.headed) {
      cypressArgs.push('--headed')
    }

    // Add environment variables
    const env = {
      ...process.env,
      CYPRESS_BASE_URL: this.options.baseUrl,
    }

    return new Promise((resolve) => {
      const cypressProcess = spawn('pnpm', cypressArgs, {
        cwd: process.cwd(),
        stdio: 'inherit',
        env
      })

      cypressProcess.on('exit', (code) => {
        const success = code === 0
        if (success) {
          console.log('✅ All Cypress tests passed!')
        } else {
          console.log(`❌ Cypress tests failed with exit code ${code}`)
        }
        resolve(success)
      })

      cypressProcess.on('error', (error) => {
        console.log(`❌ Cypress process error: ${error.message}`)
        resolve(false)
      })
    })
  }

  async runTests(): Promise<boolean> {
    console.log('🎬 Starting comprehensive test run...\n')

    let success = true

    try {
      // Step 1: Prepare test environment
      if (!await this.prepareTestEnvironment()) {
        console.log('❌ Test environment preparation failed')
        return false
      }

      // Step 2: Start the server
      const serverStarted = await this.startServer()
      if (!serverStarted) {
        console.log('⚠️ Server may not have started properly, but continuing...')
      }

      // Step 3: Run health check (unless skipped)
      if (!this.options.skipHealthCheck) {
        console.log('\n🩺 Running health check before tests...')
        const isHealthy = await this.debugger.runFullHealthCheck()
        if (!isHealthy) {
          console.log('❌ Health check failed - tests may be unreliable')
          // Don't exit - continue with tests as some issues might be minor
        }
      }

      // Step 4: Run Cypress tests
      console.log('\n🧪 Starting Cypress test execution...')
      const testsSuccess = await this.runCypressTests()
      if (!testsSuccess) {
        success = false
      }

    } catch (error: any) {
      console.log(`❌ Test run failed: ${error.message}`)
      success = false
    } finally {
      // Always stop the server
      await this.stopServer()
    }

    console.log('\n🏁 Test run completed!')
    return success
  }
}

// CLI Interface
async function main() {
  const args = process.argv.slice(2)

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Test Runner for Downbeat Academy E2E Tests

Usage: tsx scripts/test-runner.ts [options]

Options:
  --mode=<dev|start>     Server mode (default: dev)
  --spec=<pattern>       Run specific test spec pattern
  --browser=<name>       Browser to use (default: chrome)
  --headed              Run tests in headed mode
  --verbose, -v         Enable verbose output
  --skip-health-check   Skip health check before tests
  --url=<url>          Override base URL (default: http://localhost:3000)
  --help, -h           Show this help message

Examples:
  tsx scripts/test-runner.ts
  tsx scripts/test-runner.ts --mode=start
  tsx scripts/test-runner.ts --spec="cypress/e2e/auth/**"
  tsx scripts/test-runner.ts --browser=firefox --headed
  tsx scripts/test-runner.ts --verbose --skip-health-check
`)
    process.exit(0)
  }

  const options: TestRunnerOptions = {
    mode: args.find(arg => arg.startsWith('--mode='))?.split('=')[1] as 'dev' | 'start' || 'dev',
    spec: args.find(arg => arg.startsWith('--spec='))?.split('=')[1] || '',
    browser: args.find(arg => arg.startsWith('--browser='))?.split('=')[1] || 'chrome',
    baseUrl: args.find(arg => arg.startsWith('--url='))?.split('=')[1] || 'http://localhost:3000',
    headed: args.includes('--headed'),
    verbose: args.includes('--verbose') || args.includes('-v'),
    skipHealthCheck: args.includes('--skip-health-check')
  }

  console.log('🎯 Test Runner Configuration:')
  console.log(`   Mode: ${options.mode}`)
  console.log(`   Base URL: ${options.baseUrl}`)
  console.log(`   Browser: ${options.browser}`)
  console.log(`   Spec: ${options.spec || 'All tests'}`)
  console.log(`   Headed: ${options.headed}`)
  console.log(`   Verbose: ${options.verbose}`)
  console.log(`   Skip Health Check: ${options.skipHealthCheck}`)
  console.log('')

  const runner = new TestRunner(options)
  
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

  const success = await runner.runTests()
  process.exit(success ? 0 : 1)
}

if (require.main === module) {
  main().catch(error => {
    console.error('❌ Test runner failed:', error)
    process.exit(1)
  })
}

export { TestRunner }