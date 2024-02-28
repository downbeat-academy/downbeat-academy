import { sanityClient } from '@lib/sanity/sanity.client'
import { handbookPageQuery } from '@lib/queries'

import { SectionContainer } from '@components/section-container'
import { SectionTitle } from '@components/section-title'
import { Text } from '@components/text'
import { Link } from '@components/link'

import type { Metadata } from 'next'
import { Flex } from '@components/flex'

export const metadata: Metadata = {
  title: 'Handbook',
  description: 'A collection of educational content from Downbeat Academy.'
}

async function getHandbooks() {
  const res = sanityClient.fetch(
    handbookPageQuery,
    {
      next: {
        revalidate: 60,
      },
    }
  )

  if (!res) {
    throw new Error('Failed to fetch data.');
  }

  return res;
}

export default async function HandbookPage() {

  const handbooks = await getHandbooks();

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
              collapse
            >Handbook</Text>
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