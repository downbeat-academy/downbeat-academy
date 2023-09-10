import { SectionContainer } from '@components/section-container'
import { SectionTitle } from '@components/section-title'
import { Text } from '@components/text'
import { ContributorsGrid } from './contributors-grid'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contributors | Downbeat Academy',
  description: 'Downbeat Academy authors and contributors.'
}

export default async function ContributorsPage() {
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
        <ContributorsGrid />
      </SectionContainer>
    </>
  )
}