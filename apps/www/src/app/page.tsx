import { draftMode } from 'next/headers'
import { readToken } from "@app/lib/sanity.api"
import { getClient } from "@app/lib/sanity.client"
import { SectionContainer } from "@components/section-container"
import { SectionTitle } from '@components/section-title'
import { FeaturedPost, HomePostGrid } from '@components/pages/home'
import { Text } from '@components/text'

import type { Metadata } from 'next'

// Render metadata
export const metadata: Metadata = {
  title: 'Top resources for advancing musicians | Downbeat Academy',
  description: 'Top resources for advancing musicians, educators, students, and anyone looking to learn how to play an instrument.',
}

// Render the homepage data in an async function
export default async function Page() {

  return (
    <>
      <SectionContainer>
        {/* @ts-expect-error Server Component */}
        <FeaturedPost />
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
        {/* @ts-expect-error Server Component */}
        <HomePostGrid />
      </SectionContainer>
    </>
  )
}