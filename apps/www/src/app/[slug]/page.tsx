import { readToken } from '@lib/sanity.api'
import { getClient } from '@lib/sanity.client'
import { pagesBySlugQuery, pagePaths } from '@lib/queries'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

// Generate the slugs/routes for each page
export async function generateStaticParams() {
  const client = getClient()
  const slugs = await client.fetch(pagePaths)
  return slugs.map((slug) => ({ slug }));
}

// Render the page data
export default async function PageSlugRoute({ params }) {
  const { slug } = params
  const preview = draftMode().isEnabled ? { token: readToken } : undefined;
  const client = getClient(preview)
  const data = await client.fetch(pagesBySlugQuery, {
    slug,
  })

  if (!data && !preview) {
    notFound();
  }

  return (
    <p>{data.title}</p>
  )
}

