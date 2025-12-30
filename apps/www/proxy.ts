import { NextRequest, NextResponse } from 'next/server'
import { getAuth } from '@/lib/auth/auth'

/**
 * Proxy for authentication checks using better-auth.
 *
 * In Next.js 16+, proxy.ts replaces middleware.ts and runs on the Node.js runtime,
 * allowing direct database access for full session validation.
 *
 * @see https://www.better-auth.com/docs/integrations/next#middleware
 */
export async function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl

	// Define protected routes that require authentication
	const protectedRoutes = ['/account']
	const authRoutes = ['/sign-in', '/forgot-password', '/update-password']

	const isProtectedRoute = protectedRoutes.some((route) =>
		pathname.startsWith(route)
	)
	const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

	// Get session using better-auth API (available in Next.js 15.2.0+)
	const auth = getAuth()
	const session = await auth.api.getSession({
		headers: request.headers,
	})

	// Redirect to sign-in if accessing protected route without valid session
	if (isProtectedRoute && !session) {
		const signInUrl = new URL('/sign-in', request.url)
		signInUrl.searchParams.set('callbackUrl', pathname)
		return NextResponse.redirect(signInUrl)
	}

	// Redirect to account if accessing auth routes with valid session
	if (isAuthRoute && session) {
		return NextResponse.redirect(new URL('/account', request.url))
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
