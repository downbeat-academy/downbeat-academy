// import { getImageAsset, buildImageUrl } from '@sanity/asset-utils'
// import { sanityConfig } from '@app/lib/sanity.client'

// export function getSanityImageUrl(imageRef) {
// 	if (!imageRef) return null

// 	const image = getImageAsset(imageRef, sanityConfig)
// 	const getUrl = buildImageUrl(image, sanityConfig)

// 	return getUrl
// }


import { getClient } from '@lib/sanity.client'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(getClient())

export function getSanityImageUrl(source) {
	return builder.image(source)
}