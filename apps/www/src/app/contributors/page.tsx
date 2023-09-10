import { sanityClient } from '@lib/sanity.client'
import { contributorsPageQuery } from '@lib/queries'
import { SectionContainer } from '@components/section-container'
import { SectionTitle } from '@components/section-title'
import { Text } from '@components/text'
import { ContributorsGrid } from '@components/pages/contributors'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contributors | Downbeat Academy',
  description: 'Downbeat Academy authors and contributors.'
}

async function getContributors() {
  const res = sanityClient.fetch(
    contributorsPageQuery,
    { 
      next: {
        revalidate: 60,
      },
    }
  )

  if (!res) {
    throw new Error('Failed to fetch data.')
  }

  return res;
}

export default async function ContributorsPage() {

  const contributors = await getContributors();

  return (
    <>
      <SectionContainer>
        <SectionTitle
          hasBorder={false}
          title={
            <Text
              tag='h1'
              type='expressive-headline'
              size='h1'
              collapse
            >Contributors and authors</Text>
          }
        />
        {/* @ts-expect-error Server Component */}
        <ContributorsGrid contributors={contributors} />
      </SectionContainer>
    </>
  )
}