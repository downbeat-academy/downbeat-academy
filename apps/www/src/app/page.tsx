import { homepageQuery } from "@app/lib/queries"
import { readToken } from "@app/lib/sanity.api"
import { getClient } from "@app/lib/sanity.client"
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import type { Metadata } from 'next'

import { SectionTitle } from "./components/section-title"
import { Text } from '@components/text'

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

  const renderData = data.map(item => {
    return <p key={item._id}>{item.title}</p>
  })

  return (
    <>
      <p>Home page</p>
      <SectionTitle
        alignment='center'
        background='success'
        title={<Text color='high-contrast' tag='h4' size="h4" type='expressive-headline' collapse>This is the section title</Text>}
        subtitle={<Text color='high-contrast' tag='p' size='body-base' type='expressive-body' collapse>This is the subtitle</Text>}
      />
      {renderData}
    </>
  )
}