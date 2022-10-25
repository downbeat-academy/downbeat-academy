import { parseAssetId, buildFileUrl } from '@sanity/asset-utils';
import { sanityConfig } from '@lib/sanityConfig';

export function getSanityUrl(assetId) {
	if (!assetId) return null;

	const assetParts = parseAssetId(assetId);
	const getUrl = buildFileUrl(assetParts, sanityConfig);

	return getUrl;
}
