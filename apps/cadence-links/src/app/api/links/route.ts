import { NextRequest, NextResponse } from 'next/server'
import { createLink, getAllLinks } from '@lib/db/queries/links'
import { generateUniqueShortCode } from '@lib/utils/short-code'
import { isValidUrl, normalizeUrl } from '@lib/utils/url-validator'
import { AVAILABLE_DOMAINS } from '@lib/constants/domains'
import type {
	CreateLinkRequest,
	CreateLinkResponse,
	GetLinksResponse,
	ErrorResponse,
} from '@/types/link'

/**
 * POST /api/links - Create a new shortened link
 */
export async function POST(
	request: NextRequest
): Promise<NextResponse<CreateLinkResponse | ErrorResponse>> {
	try {
		const body = (await request.json()) as CreateLinkRequest
		const { url, domain } = body

		// Validate URL
		if (!url || typeof url !== 'string') {
			return NextResponse.json(
				{ success: false, error: 'URL is required' },
				{ status: 400 }
			)
		}

		const normalizedUrl = normalizeUrl(url)

		if (!isValidUrl(normalizedUrl)) {
			return NextResponse.json(
				{ success: false, error: 'Invalid URL format' },
				{ status: 400 }
			)
		}

		// Validate domain
		if (!domain || !AVAILABLE_DOMAINS.includes(domain)) {
			return NextResponse.json(
				{ success: false, error: 'Invalid domain' },
				{ status: 400 }
			)
		}

		// Generate unique short code
		const shortCode = await generateUniqueShortCode()

		// Create the link
		const link = await createLink({
			originalUrl: normalizedUrl,
			shortCode,
			domain,
		})

		const shortUrl = `${domain}/${shortCode}`

		return NextResponse.json({
			success: true,
			link,
			shortUrl,
		})
	} catch (error) {
		console.error('Error creating link:', error)
		return NextResponse.json(
			{ success: false, error: 'Failed to create link' },
			{ status: 500 }
		)
	}
}

/**
 * GET /api/links - Get all links
 */
export async function GET(): Promise<NextResponse<GetLinksResponse | ErrorResponse>> {
	try {
		const links = await getAllLinks()

		return NextResponse.json({
			success: true,
			links,
		})
	} catch (error) {
		console.error('Error fetching links:', error)
		return NextResponse.json(
			{ success: false, error: 'Failed to fetch links' },
			{ status: 500 }
		)
	}
}
