/**
 * Check if a string is a valid URL
 */
export function isValidUrl(url: string): boolean {
	try {
		const parsed = new URL(url)
		// Only allow http and https protocols
		return parsed.protocol === 'http:' || parsed.protocol === 'https:'
	} catch {
		return false
	}
}

/**
 * Normalize a URL by ensuring it has a protocol
 * and removing trailing slashes
 */
export function normalizeUrl(url: string): string {
	let normalized = url.trim()

	// Add https:// if no protocol is specified
	if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
		normalized = `https://${normalized}`
	}

	// Validate the URL after adding protocol
	try {
		const parsed = new URL(normalized)
		// Remove trailing slash from pathname if it's just "/"
		if (parsed.pathname === '/') {
			return `${parsed.protocol}//${parsed.host}${parsed.search}${parsed.hash}`
		}
		// Remove trailing slash from pathname
		if (parsed.pathname.endsWith('/')) {
			parsed.pathname = parsed.pathname.slice(0, -1)
		}
		return parsed.toString()
	} catch {
		return normalized
	}
}
