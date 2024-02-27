import { sanityClient } from '@lib/sanity/sanity.client'
import { almanacPageQuery } from '@lib/queries'

import { SectionContainer } from '@components/section-container'
import { SectionTitle } from '@components/section-title'
import { Text } from '@components/text'
import { Link } from '@components/link'

import type { Metadata } from 'next'
import { Flex } from '@components/flex'

export const metadata: Metadata = {
  title: 'Almanac',
  description: 'A collection of educational content from Downbeat Academy.'
}

async function getAlmanacs() {
  const res = sanityClient.fetch(
    almanacPageQuery,
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

export default async function AlmanacPage() {

  const almanacs = await getAlmanacs();

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
            >Almanac</Text>
          }
        />
        <Flex direction='column' gap='small' padding='large'>
          {almanacs.map((almanac) => (
            <Text
              key={almanac._id}
              tag='p'
              type='expressive-body'
              size='body-base'
              collapse
            >
              <Link
                type='inherit'
                href={`/almanac/${almanac.slug}`}
              >
                {almanac.title}
              </Link>
            </Text>
          ))}
        </Flex>
      </SectionContainer>
    </>
  )
}