import { homepageQuery } from "@app/lib/queries"
import { readToken } from "@app/lib/sanity.api"
import { getClient } from "@app/lib/sanity.client"
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import Image from 'next/image'

import type { Metadata } from 'next'

import { SectionTitle } from "./components/section-title"
import { SectionContainer } from "./components/section-container"
import { Text } from '@components/text'
import * as FeaturedItem from "@components/featured-item"

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

  // Get the first post/article from the returned data
  const featuredPost = data.slice(0,1)[0];

  // Return an array with all but the first post from the returned data.
  const posts = data.slice(1);

  return (
    <>
      <SectionContainer>
        <SectionTitle
          alignment='left'
          title={<Text color='brand' tag='h1' size="h1" type='expressive-headline' collapse>Home page</Text>}
          subtitle={<Text color='brand' tag='p' size='body-base' type='expressive-body' collapse>This is the subtitle</Text>}
        />
        <FeaturedItem.Root
          title={
            <FeaturedItem.Title
              title={
                <Text
                  tag='h1'
                  type='expressive-headline'
                  size='h1'
                  color='high-contrast'
                  collapse
                >{featuredPost.title}</Text>
              }
              description={
                <Text
                  tag='p'
                  type='expressive-body'
                  size='body-large'
                  color='high-contrast'
                  collapse
                >{featuredPost.excerpt}</Text>
              }
            />
          }
        />
      </SectionContainer>
    </>
  )
}