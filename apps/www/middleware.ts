import { NextRequest, NextResponse } from 'next/server'
import { getAuth } from '@/lib/auth/auth'

/**
 * Middleware for authentication checks using better-auth.
 * 
 * For Next.js 15.2.0+, we can use the Node.js runtime and call auth.api directly.
 * This provides better security than just checking cookie existence.
 * 
 * @see https://www.better-auth.com/docs/integrations/next#middleware
 */
export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	// Define protected routes that require authentication
	const protectedRoutes = ['/dashboard', '/account', '/settings']
	const authRoutes = ['/login', '/register', '/forgot-password']

	const isProtectedRoute = protectedRoutes.some((route) =>
		pathname.startsWith(route)
	)
	const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

	// Get session using better-auth API (available in Next.js 15.2.0+)
	const auth = getAuth()
	const session = await auth.api.getSession({
		headers: request.headers,
	})

	// Redirect to login if accessing protected route without valid session
	if (isProtectedRoute && !session) {
		const loginUrl = new URL('/login', request.url)
		loginUrl.searchParams.set('callbackUrl', pathname)
		return NextResponse.redirect(loginUrl)
	}

	// Redirect to dashboard if accessing auth routes with valid session
	if (isAuthRoute && session) {
		return NextResponse.redirect(new URL('/dashboard', request.url))
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
