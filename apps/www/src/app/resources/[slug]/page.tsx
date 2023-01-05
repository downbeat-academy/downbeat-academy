import { sanityClient } from "@lib/sanity.client";
import { resourcesBySlugQuery, resourceSlugsQuery } from "./queries";
import { ResourcePayload } from "./types";

export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = (await sanityClient.fetch<string[]>(resourceSlugsQuery)) || []

  return slugs.map((slug) => ({ slug }))
}

export async function getResource({ slug }): Promise<ResourcePayload | undefined> {
  const resource = await sanityClient?.fetch(
    resourcesBySlugQuery,
    { slug, next: { revalidate: 60 } },
  )

  return resource
}

export default async function Resource({ params }) {
  const data = await getResource({ slug: params.slug })

  const {
    title
  } = data || {}

  return (<h1>{title}</h1>)
}