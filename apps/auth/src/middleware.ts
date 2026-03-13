import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PRODUCTION_ORIGINS = [
	'https://downbeatacademy.com',
	'https://www.downbeatacademy.com',
	'https://auth.downbeatacademy.com',
	'https://links.downbeatacademy.services',
]

const DEV_ORIGINS = [
	'http://localhost:3000',
	'http://localhost:3001',
	'http://localhost:3002',
]

function getAllowedOrigins() {
	const origins = [...PRODUCTION_ORIGINS]
	if (process.env.NODE_ENV === 'development') {
		origins.push(...DEV_ORIGINS)
	}
	// Allow additional origins via env var (comma-separated)
	// Useful for preview deployments on Railway
	const extra = process.env.ALLOWED_ORIGINS
	if (extra) {
		origins.push(...extra.split(',').map(o => o.trim()).filter(Boolean))
	}
	return origins
}

function getCorsHeaders(origin: string) {
	return {
		'Access-Control-Allow-Origin': origin,
		'Access-Control-Allow-Credentials': 'true',
		'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type, Authorization',
	}
}

export function middleware(request: NextRequest) {
	const origin = request.headers.get('origin') ?? ''
	const allowedOrigins = getAllowedOrigins()
	const isAllowedOrigin = allowedOrigins.includes(origin)

	// Handle preflight OPTIONS requests
	if (request.method === 'OPTIONS') {
		if (isAllowedOrigin) {
			return new NextResponse(null, {
				status: 204,
				headers: getCorsHeaders(origin),
			})
		}
		return new NextResponse(null, { status: 403 })
	}

	// For all other requests, add CORS headers to the response
	const response = NextResponse.next()
	if (isAllowedOrigin) {
		const headers = getCorsHeaders(origin)
		for (const [key, value] of Object.entries(headers)) {
			response.headers.set(key, value)
		}
	}

	return response
}

export const config = {
	matcher: '/api/auth/:path*',
}
