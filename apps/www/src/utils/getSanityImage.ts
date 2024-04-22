// import { getImageAsset, buildImageUrl } from '@sanity/asset-utils'
// import { sanityConfig } from '@lib/sanity.client'

// export function getSanityImageUrl(imageRef) {
// 	if (!imageRef) return null

// 	const image = getImageAsset(imageRef, sanityConfig)
// 	const getUrl = buildImageUrl(image, sanityConfig)

// 	return getUrl
// }

import { sanityClient } from '@lib/sanity/sanity.client'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(sanityClient)

export function getSanityImageUrl(source) {
	return builder.image(source)
}
