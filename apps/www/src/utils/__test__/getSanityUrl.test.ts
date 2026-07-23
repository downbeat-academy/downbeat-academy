import { beforeEach, describe, expect, it, vi } from 'vitest'

const { parseAssetId, buildFileUrl } = vi.hoisted(() => ({
	parseAssetId: vi.fn(() => ({ assetId: 'abc', extension: 'pdf' })),
	buildFileUrl: vi.fn(() => 'https://cdn.sanity.io/files/p/d/abc.pdf'),
}))

vi.mock('@sanity/asset-utils', () => ({ parseAssetId, buildFileUrl }))
vi.mock('@lib/sanity/sanity.config', () => ({
	sanityConfig: { projectId: 'p', dataset: 'd' },
}))

import { getSanityUrl } from '../getSanityUrl'

describe('getSanityUrl', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('returns null for a falsy asset id without touching the asset utils', () => {
		expect(getSanityUrl('')).toBeNull()
		expect(parseAssetId).not.toHaveBeenCalled()
		expect(buildFileUrl).not.toHaveBeenCalled()
	})

	it('parses the asset id and builds the file url from config', () => {
		const result = getSanityUrl('file-abc-pdf')
		expect(parseAssetId).toHaveBeenCalledWith('file-abc-pdf')
		expect(buildFileUrl).toHaveBeenCalledWith(
			{ assetId: 'abc', extension: 'pdf' },
			{ projectId: 'p', dataset: 'd' }
		)
		expect(result).toBe('https://cdn.sanity.io/files/p/d/abc.pdf')
	})
})
