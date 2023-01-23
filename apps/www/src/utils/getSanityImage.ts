import { sanityClient } from "@lib/sanity.client";
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: string) {
  return builder.image(source)
}