import { getImageAsset, buildImageUrl } from '@sanity/asset-utils'
import { sanityConfig } from "@lib/sanity.client";

export function getSanityImageUrl(imageRef) {
  if (!imageRef) return null;

  const image = getImageAsset(imageRef, sanityConfig);
  const getUrl = buildImageUrl(image, sanityConfig);

  return getUrl;
}
