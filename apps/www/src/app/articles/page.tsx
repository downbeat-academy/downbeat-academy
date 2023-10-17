import { sanityClient } from '@lib/sanity.client'
import { articlesPageQuery } from '@lib/queries'
import { getOgTitle } from '@utils/metaHelpers'

import { SectionContainer } from '@components/section-container'
import { SectionTitle } from '@components/section-title'
import { Text } from '@components/text'
import { ArticlesPostGrid } from '../components/pages/articles'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: getOgTitle('Articles'),
  description: 'Recent articles and learning materials from Downbeat Academy.'
}

async function getArticles() {
  const res = sanityClient.fetch(
    articlesPageQuery,
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

export default async function ArticlesPage() {

  const articles = await getArticles();

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
        <ArticlesPostGrid articles={articles} />
      </SectionContainer>
    </>
  )
}