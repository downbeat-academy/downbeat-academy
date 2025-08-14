import { parseAssetId, buildFileUrl } from '@sanity/asset-utils'
import { sanityConfig } from '@lib/sanity/sanity.config'

function getSanityUrl(assetId: string): string | null {
	if (!assetId) return null

	const assetParts = parseAssetId(assetId)
	const url = buildFileUrl(assetParts, sanityConfig)

	return url
}

export { getSanityUrl }
