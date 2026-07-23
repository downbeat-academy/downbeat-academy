import { describe, expect, it } from 'vitest'
import { fileDownloadSchema } from '../file-download-schema'

describe('fileDownloadSchema', () => {
	it('accepts a valid email', () => {
		// The trailing `.refine((data) => data.email)` is redundant once `.min(1)`
		// and `.email()` have passed; documented here for completeness.
		expect(
			fileDownloadSchema.safeParse({ email: 'user@example.com' }).success
		).toBe(true)
	})

	it('rejects an empty email', () => {
		const result = fileDownloadSchema.safeParse({ email: '' })
		expect(result.success).toBe(false)
		expect(result.success ? [] : result.error.issues.map((i) => i.message)).toContain(
			'Email is required'
		)
	})

	it('rejects an invalid email format', () => {
		expect(fileDownloadSchema.safeParse({ email: 'nope' }).success).toBe(false)
	})
})
