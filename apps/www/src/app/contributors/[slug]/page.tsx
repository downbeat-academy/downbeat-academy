import { sanityClient } from "@lib/sanity.client";
import { contributorsBySlugQuery, contributorSlugsQuery } from "./queries";
import { ContributorPayload } from "./types";

export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = (await sanityClient.fetch<string[]>(contributorSlugsQuery)) || []

  return slugs.map((slug) => ({ slug }))
}

export async function getContributor({ slug }): Promise<ContributorPayload | undefined> {
  const contributor = await sanityClient?.fetch(
    contributorsBySlugQuery,
    { slug, next: { revalidate: 60 } },
  )

  return contributor
}

export default async function Contributor({ params }) {
  const data = await getContributor({ slug: params.slug })

  const {
    name
  } = data

  return (<h1>{name}</h1>)
}