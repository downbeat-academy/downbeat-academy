import { sanityClient } from "@lib/sanity.client";
import { landingPageSlugsQuery, landingPagesBySlugQuery } from "./queries";
import { LandingPagePayload } from "./types";

export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = (await sanityClient.fetch<string[]>(landingPageSlugsQuery)) || []

  return slugs.map((slug) => ({ slug }))
}

async function getLandingPage({ slug }): Promise<LandingPagePayload | undefined> {
  const landingPage = await sanityClient?.fetch(
    landingPagesBySlugQuery,
    { slug, next: { revalidate: 60 } },
  )

  return landingPage
}

export default async function LandingPage({ params }) {
  const data = await getLandingPage({ slug: params.slug })

  const {
    title
  } = data || {}

  return (<h1>{title}</h1>)
}