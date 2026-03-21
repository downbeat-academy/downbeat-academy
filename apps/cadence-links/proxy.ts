import { NextRequest, NextResponse } from 'next/server'
import { getAuth } from '@/lib/auth/auth'

/**
 * Proxy for authentication checks using better-auth.
 *
 * In Next.js 16+, proxy.ts replaces middleware.ts and runs on the Node.js runtime,
 * allowing direct database access for full session validation.
 *
 * Auth operations (sign-in, sign-up, etc.) are handled by the centralized auth service
 * via OAuth 2.1 flow. Unauthenticated users are redirected to the local /sign-in page
 * which triggers the OAuth flow.
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

	// Redirect to local sign-in page (which triggers OAuth flow) if not authenticated
	if (isProtectedRoute && !session) {
		const signInUrl = new URL('/sign-in', request.url)
		signInUrl.searchParams.set('callbackURL', pathname)
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
