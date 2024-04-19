import { sanityClient } from 'lib/sanity/sanity.client'
import { handbookPageQuery } from 'lib/queries'

import { SectionContainer } from 'components/section-container'
import { SectionTitle } from 'components/section-title'
import { Text } from 'components/text'
import { Link } from 'components/link'
import { Flex } from 'components/flex'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Handbook',
  description: 'A collection of educational content from Downbeat Academy.'
}

async function getHandbooks() {
  const res = sanityClient.fetch(
    handbookPageQuery,
    {
      revalidate: 60,
    }
  )

  if (!res) {
    throw new Error('Failed to fetch data.');
  }

  return res;
}

export default async function HandbookPage() {

  // Get all of the handbook entries
  const handbooks = await getHandbooks();
  // Sort the entries alphabetically by title
  handbooks.sort((a, b) => a.title.localeCompare(b.title));

  return (
    <>
      <SectionContainer>
        <SectionTitle
          background='primary'
          title={
            <Text
              tag='h1'
              type='expressive-headline'
              size='h1'
              color='brand'
              collapse
            >Handbook</Text>
          }
          subtitle={
            <Text tag='p' type='expressive-body' size='body-base' color='primary' collapse>
              The Downbeat Academy Handbook is a collection of educational content that covers a wide range of topics. From music theory to instrument technique, the handbook is a valuable resource for students and teachers alike.
            </Text>
          }
        />
        <Flex direction='column' gap='small' padding='large'>
          {handbooks.map((handbook) => (
            <Text
              key={handbook._id}
              tag='p'
              type='expressive-body'
              size='body-base'
              collapse
            >
              <Link
                type='inherit'
                href={`/handbook/${handbook.slug}`}
              >
                {handbook.title}
              </Link>
            </Text>
          ))}
        </Flex>
      </SectionContainer>
    </>
  )
}