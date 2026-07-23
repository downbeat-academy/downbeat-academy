import { describe, expect, it, vi } from 'vitest'

// The source builds its image-url builder at module load from the Sanity client,
// so both the client and the builder factory must be mocked before import.
const { imageSpy } = vi.hoisted(() => ({
	imageSpy: vi.fn((source: unknown) => `image:${JSON.stringify(source)}`),
}))

vi.mock('@lib/sanity/sanity.client', () => ({
	sanityClient: { config: () => ({ projectId: 'test', dataset: 'test' }) },
}))

vi.mock('@sanity/image-url', () => ({
	default: () => ({ image: imageSpy }),
}))

import { getSanityImageUrl } from '../getSanityImage'

describe('getSanityImageUrl', () => {
	it('delegates to the image-url builder and returns its result', () => {
		const source = { asset: { _ref: 'image-abc-100x100-png' } }
		const result = getSanityImageUrl(source)
		expect(imageSpy).toHaveBeenCalledWith(source)
		expect(result).toBe(`image:${JSON.stringify(source)}`)
	})
})
