import { customAlphabet } from 'nanoid'
import { shortCodeExists } from '@lib/db/queries/links'

// Exclude ambiguous characters: 0, O, o, I, l, 1
// This prevents confusion when reading/typing short codes
const ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz'
const CODE_LENGTH = 6

const generateCode = customAlphabet(ALPHABET, CODE_LENGTH)

/**
 * Generate a unique short code that doesn't exist in the database
 */
export async function generateUniqueShortCode(): Promise<string> {
	let code = generateCode()
	let attempts = 0
	const maxAttempts = 10

	// Keep generating until we find a unique code
	while (await shortCodeExists(code)) {
		code = generateCode()
		attempts++

		if (attempts >= maxAttempts) {
			throw new Error('Failed to generate unique short code after maximum attempts')
		}
	}

	return code
}

/**
 * Generate a short code without checking the database
 * Useful for testing or when you'll check uniqueness separately
 */
export function generateShortCode(): string {
	return generateCode()
}
