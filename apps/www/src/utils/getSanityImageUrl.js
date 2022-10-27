import { buildImageUrl, getImageAsset } from '@sanity/asset-utils';
import { sanityConfig } from '@lib/sanityConfig';

export function getSanityImageUrl(imageRef) {
	if (!imageRef) return null;

	const image = getImageAsset(imageRef, sanityConfig);
	const getUrl = buildImageUrl(image, sanityConfig);

	return getUrl;
}
