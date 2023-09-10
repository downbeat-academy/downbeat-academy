import { SectionContainer } from '@components/section-container'
import { SectionTitle } from '@components/section-title'
import { Text } from '@components/text'
import { ArticlesPostGrid } from './articles-post-grid'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Recent articles form Downbeat Academy | Downbeat Academy',
  description: 'Articles and learning materials from Downbeat Academy.'
}

export default async function ArticlesPage() {
  return (
    <>
      <SectionContainer>
        <SectionTitle
          title={
            <Text
              tag='h1'
              type='expressive-headline'
              size='h1'
              collapse
            >Recent articles</Text>
          }
        />
        {/* @ts-expect-error Server Component */}
        <ArticlesPostGrid />
      </SectionContainer>
    </>
  )
}