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
import { Flex } from '@components/flex'

import { Avatar, AvatarGroup } from '@components/avatar'

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
      <SectionContainer>
        <SectionTitle
          alignment='left'
          title={<Text color='brand' tag='h1' size="h1" type='expressive-headline' collapse>Home page</Text>}
          subtitle={<Text color='brand' tag='p' size='body-base' type='expressive-body' collapse>This is the subtitle</Text>}
        />
        <Flex direction='row' gap='medium'>
          <AvatarGroup
            direction='row'
            spacing='small'
          >
            <Avatar
              name='Jory Tindall'
              size='large'
            />
            <Avatar
              name='Alex Mankey'
              size='large'
              imageUrl='https://placehold.co/80x80'
            />
            <Avatar
              name='Cool Avatar'
              size='large'
              imageObject={<Image width='80' height='80' src='/images/avatar-test.png' alt='Cool Avatar' />}
            />
          </AvatarGroup>
        </Flex>
        {/* {renderData} */}
      </SectionContainer>
    </>
  )
}