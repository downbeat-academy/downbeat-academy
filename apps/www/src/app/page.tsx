import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import Image from 'next/image'

import { homepageQuery } from "@app/lib/queries"
import { readToken } from "@app/lib/sanity.api"
import { getClient } from "@app/lib/sanity.client"
import { linkResolver } from '@utils/linkResolver'
import { prettyDate } from '@utils/dateFormat'

import { SectionContainer } from "./components/section-container"
import { Text } from '@components/text'
import * as FeaturedItem from "@components/featured-item"
import { AuthorMetadata } from '@components/author'
import { Badge } from "@components/badge"
import { Flex } from '@components/flex'
import { Link } from '@components/link'

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

  // Get the first post/article from the returned data
  const featuredPost = data.slice(0,1)[0];

  // Return an array with all but the first post from the returned data.
  const posts = data.slice(1);

  // Render the categories of the featured post as badges
  const renderCategories = featuredPost.categories.map(category => {
    return (
      <Link href={linkResolver(category.slug, 'category')} key={category.name}>
        <Badge type='neutral' style='filled' text={category.title} />
      </Link>
    )
  })

  return (
    <>
      <SectionContainer>
        <FeaturedItem.Root>
          <FeaturedItem.Title>
            <Text
              tag='h1'
              type='expressive-headline'
              size='h1'
              color='high-contrast'
              collapse
            >{featuredPost.title}</Text>
            <Text
              tag='p'
              type='expressive-body'
              size='body-large'
              color='high-contrast'
              collapse
            >{featuredPost.excerpt}</Text>
          </FeaturedItem.Title>
          <FeaturedItem.Authors>
            <AuthorMetadata
              authors={featuredPost.authors}
              date={prettyDate(featuredPost.date)}
            >
              <Flex tag='div' direction='row' gap='medium'>
                {renderCategories}
              </Flex>
            </AuthorMetadata>
          </FeaturedItem.Authors>
        </FeaturedItem.Root>
      </SectionContainer>
    </>
  )
}