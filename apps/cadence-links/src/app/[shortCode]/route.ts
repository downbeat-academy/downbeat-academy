import { NextRequest, NextResponse } from 'next/server'
import { getLinkByShortCode } from '@lib/db/queries/links'

interface RouteParams {
	params: Promise<{
		shortCode: string
	}>
}

/**
 * GET /[shortCode] - Redirect to the original URL
 */
export async function GET(
	_request: NextRequest,
	{ params }: RouteParams
): Promise<NextResponse> {
	try {
		const { shortCode } = await params

		if (!shortCode) {
			return NextResponse.json(
				{ error: 'Short code is required' },
				{ status: 400 }
			)
		}

		const link = await getLinkByShortCode(shortCode)

		if (!link) {
			return NextResponse.json(
				{ error: 'Link not found' },
				{ status: 404 }
			)
		}

		// Temporary redirect (302) allows link updates/deletions to take effect
		// Use 301 only if links are guaranteed to be immutable
		return NextResponse.redirect(link.originalUrl, { status: 302 })
	} catch (error) {
		console.error('Error redirecting:', error)
		return NextResponse.json(
			{ error: 'Failed to redirect' },
			{ status: 500 }
		)
	}
}
