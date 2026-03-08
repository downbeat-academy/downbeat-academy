import { NextRequest, NextResponse } from 'next/server'
import { getAuth } from '@/lib/auth/auth'
import { getSignInUrl } from '@/lib/auth/require-auth'

/**
 * Proxy for authentication checks using better-auth.
 *
 * In Next.js 16+, proxy.ts replaces middleware.ts and runs on the Node.js runtime,
 * allowing direct database access for full session validation.
 *
 * Auth operations (sign-in, sign-up, etc.) are handled by the centralized auth service.
 */
export async function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl

	// Define protected routes that require authentication
	const protectedRoutes = ['/dashboard']

	const isProtectedRoute = protectedRoutes.some((route) =>
		pathname.startsWith(route)
	)

	// Get session using better-auth API
	const auth = getAuth()
	const session = await auth.api.getSession({
		headers: request.headers,
	})

	// Redirect to auth service sign-in if accessing protected route without valid session
	if (isProtectedRoute && !session) {
		const signInUrl = getSignInUrl(pathname)
		return NextResponse.redirect(signInUrl)
	}

	return NextResponse.next()
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for:
		 * - api/auth (auth endpoints need to be accessible)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico, sitemap.xml, robots.txt
		 * - public assets (images, fonts, etc.)
		 */
		'/((?!api/auth|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff|woff2)$).*)',
	],
}
