import { homepagePostsQuery } from "@lib/queries"
import { sanityClient } from "@lib/sanity.client"

import { SectionContainer } from "@components/section-container"
import { SectionTitle } from '@components/section-title'
import { FeaturedPost, HomePostGrid } from '@components/pages/home'
import { Text } from '@components/text'

import type { Metadata } from 'next'

async function getHomepageData() {
  const res = sanityClient.fetch(
    homepagePostsQuery,
    {
      next: {
        revalidate: 60,
      }
    }
  )

  if (!res) {
    throw new Error('Failed to fetch data.')
  }

  return res
}

// Render metadata
export const metadata: Metadata = {
  title: 'Top resources for advancing musicians | Downbeat Academy',
  description: 'Top resources for advancing musicians, educators, students, and anyone looking to learn how to play an instrument.',
}

// Render the homepage data in an async function
export default async function Page() {

  const data = await getHomepageData();
  const featuredPost = data[0]
  const posts = data.slice(1, -1);

  return (
    <>
      <SectionContainer>
        <FeaturedPost featuredPost={featuredPost} />
      </SectionContainer>
      <SectionContainer>
        <SectionTitle
          title={
            <Text
              tag='h2'
              type='expressive-headline'
              size='h2'
              collapse
            >Recent articles</Text>
          }
        />
        <HomePostGrid posts={posts} />
      </SectionContainer>
    </>
  )
}