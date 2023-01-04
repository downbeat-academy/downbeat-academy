import { sanityClient } from "@lib/sanity.client";
import { podcastsBySlugQuery, podcastSlugsQuery } from "./queries";
import { PodcastPayload } from "./types";

export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = (await sanityClient.fetch<string[]>(podcastSlugsQuery)) || []

  return slugs.map((slug) => ({ slug }))
}

async function getPodcast({ slug }): Promise<PodcastPayload | undefined> {
  const podcast = await sanityClient?.fetch(
    podcastsBySlugQuery,
    { slug, next: { revalidate: 60 } },
  )

  return podcast
}

export default async function Podcast({ params }) {
  const data = await getPodcast({ slug: params.slug })

  const {
    title
  } = data || {}

  return (<h1>{title}</h1>)
}