import { homepageQuery } from "@lib/sanity.queries"
import { readToken } from "@lib/sanity.api"
import { getClient } from "@lib/sanity.client"
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

export default async function Page() {
  const preview = draftMode().isEnabled ? { token: readToken! } : undefined;
  const client = getClient(preview)

  const data = await client.fetch(homepageQuery);

  console.log(data)

  return (
    <p>Home page</p>
  )
}