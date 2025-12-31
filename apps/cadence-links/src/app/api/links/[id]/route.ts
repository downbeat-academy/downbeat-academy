import { NextRequest, NextResponse } from 'next/server'
import { deleteLink } from '@lib/db/queries/links'
import type { DeleteLinkResponse, ErrorResponse } from '@/types/link'

interface RouteParams {
	params: Promise<{
		id: string
	}>
}

/**
 * DELETE /api/links/[id] - Delete a link by ID
 */
export async function DELETE(
	request: NextRequest,
	{ params }: RouteParams
): Promise<NextResponse<DeleteLinkResponse | ErrorResponse>> {
	try {
		const { id } = await params

		if (!id) {
			return NextResponse.json(
				{ success: false, error: 'Link ID is required' },
				{ status: 400 }
			)
		}

		const deleted = await deleteLink(id)

		if (!deleted) {
			return NextResponse.json(
				{ success: false, error: 'Link not found' },
				{ status: 404 }
			)
		}

		return NextResponse.json({
			success: true,
		})
	} catch (error) {
		console.error('Error deleting link:', error)
		return NextResponse.json(
			{ success: false, error: 'Failed to delete link' },
			{ status: 500 }
		)
	}
}
