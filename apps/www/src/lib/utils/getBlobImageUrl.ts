/**
 * Utility function to get the full URL for a Vercel Blob image
 *
 * @param url The relative URL path from the database
 * @returns The complete URL with proper hostname for Vercel Blob storage
 */
export function getBlobImageUrl(url: string | null | undefined): string | null {
	if (!url) return null

	// If the URL is already absolute (starts with http), return it as is
	if (url.startsWith('http')) {
		return url
	}

	// If it's an API route for media
	if (url.startsWith('/api/media')) {
		// URL is already relative to our domain, so we can use it directly
		return url
	}

	// For other cases, you might need to construct the URL based on your Vercel Blob storage configuration
	// This is a placeholder - adjust according to your actual setup
	const baseUrl = process.env.NEXT_PUBLIC_BLOB_STORAGE_URL || ''
	return `${baseUrl}${url.startsWith('/') ? url : `/${url}`}`
}
