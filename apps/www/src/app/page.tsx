import { draftMode } from 'next/headers'

import { homepageQuery } from "@app/lib/queries"
import { readToken } from "@app/lib/sanity.api"
import { getClient } from "@app/lib/sanity.client"

import { SectionContainer } from "@components/section-container"
import { HomeFeaturedPost } from '@components/pages/home'

import type { Metadata } from 'next'

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

// Render metadata
export const metadata: Metadata = {
  title: 'Top resources for advancing musicians | Downbeat Academy',
  description: 'Top resources for advancing musicians, educators, students, and anyone looking to learn how to play an instrument.',
}

// Render the homepage data in an async function
export default async function Page() {

  const data = await getHomepageData();

  // Return an array with all but the first post from the returned data.
  const posts = data.slice(1);

  return (
    <>
      <SectionContainer>
        {/* @ts-expect-error Server Component */}
        <HomeFeaturedPost />
      </SectionContainer>
    </>
  )
}