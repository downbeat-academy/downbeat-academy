import { homepageQuery } from "@app/lib/queries"
import { readToken } from "@app/lib/sanity.api"
import { getClient } from "@app/lib/sanity.client"
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

// Fetch the data for the homepage
async function getHomepageData() {
  const preview = draftMode().isEnabled ? { token: readToken! } : undefined;
  const client = getClient(preview)
  const res = client.fetch(homepageQuery)

  if (!res) {
    throw new Error('Failed to fetch data.');
  }

  return res;
}

// Render the homepage data in an async function
export default async function Page() {

  const data = await getHomepageData();

  const renderData = data.map(item => {
    return <p key={item._id}>{item.title}</p>
  })

  return (
    <>
      <p>Home page</p>
      {renderData}
    </>
  )
}