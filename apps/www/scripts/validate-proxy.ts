/**
 * Validates Next.js 16 proxy configuration.
 *
 * Next.js 16 replaced middleware.ts with proxy.ts and requires:
 * 1. File must be named proxy.ts (not middleware.ts)
 * 2. Must export a function named 'proxy' (not 'middleware')
 * 3. Must export a config object with matcher
 *
 * Run: pnpm tsx scripts/validate-proxy.ts
 */

import * as fs from 'fs'
import * as path from 'path'

const ROOT_DIR = path.resolve(__dirname, '..')

interface ValidationResult {
	passed: boolean
	errors: string[]
	warnings: string[]
}

function validateProxyConfiguration(): ValidationResult {
	const result: ValidationResult = {
		passed: true,
		errors: [],
		warnings: [],
	}

	const proxyPath = path.join(ROOT_DIR, 'proxy.ts')
	const middlewarePath = path.join(ROOT_DIR, 'middleware.ts')

	// Check that middleware.ts does NOT exist (deprecated in Next.js 16)
	if (fs.existsSync(middlewarePath)) {
		result.passed = false
		result.errors.push(
			'middleware.ts exists but is deprecated in Next.js 16. Rename to proxy.ts and export function "proxy" instead of "middleware".'
		)
	}

	// Check that proxy.ts exists
	if (!fs.existsSync(proxyPath)) {
		result.passed = false
		result.errors.push(
			'proxy.ts not found. Next.js 16 requires proxy.ts for request interception.'
		)
		return result
	}

	// Read and validate proxy.ts content
	const proxyContent = fs.readFileSync(proxyPath, 'utf-8')

	// Check for correct function export
	const hasProxyExport = /export\s+(async\s+)?function\s+proxy\s*\(/.test(
		proxyContent
	)
	const hasMiddlewareExport =
		/export\s+(async\s+)?function\s+middleware\s*\(/.test(proxyContent)

	if (hasMiddlewareExport && !hasProxyExport) {
		result.passed = false
		result.errors.push(
			'proxy.ts exports "middleware" function instead of "proxy". In Next.js 16, the function must be named "proxy".'
		)
	}

	if (!hasProxyExport && !hasMiddlewareExport) {
		result.passed = false
		result.errors.push(
			'proxy.ts does not export a "proxy" function. Add: export async function proxy(request: NextRequest) { ... }'
		)
	}

	// Check for config export
	const hasConfigExport = /export\s+const\s+config\s*=/.test(proxyContent)
	if (!hasConfigExport) {
		result.warnings.push(
			'proxy.ts does not export a config object. Consider adding route matchers for better performance.'
		)
	}

	// Check for NextRequest import
	const hasNextRequestImport = /import.*NextRequest.*from\s+['"]next\/server['"]/.test(
		proxyContent
	)
	if (!hasNextRequestImport) {
		result.warnings.push(
			'proxy.ts does not import NextRequest from next/server.'
		)
	}

	return result
}

function main() {
	console.log('Validating Next.js 16 proxy configuration...\n')

	const result = validateProxyConfiguration()

	if (result.errors.length > 0) {
		console.log('ERRORS:')
		result.errors.forEach((error) => console.log(`  - ${error}`))
		console.log()
	}

	if (result.warnings.length > 0) {
		console.log('WARNINGS:')
		result.warnings.forEach((warning) => console.log(`  - ${warning}`))
		console.log()
	}

	if (result.passed) {
		console.log('Proxy configuration is valid.')
		process.exit(0)
	} else {
		console.log('Proxy configuration validation FAILED.')
		process.exit(1)
	}
}

main()
