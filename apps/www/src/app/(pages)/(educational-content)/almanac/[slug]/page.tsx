import { sanityClient } from '@lib/sanity/sanity.client'
import { almanacsBySlugQuery, almanacPaths } from '@lib/queries'
import { getOgTitle } from '@utils/metaHelpers'
import { Text } from '@components/text'
import { SectionContainer } from '@components/section-container'
import { SectionTitle } from '@components/section-title'
import { RichText, RichTextWrapper } from '@components/rich-text'
import { Flex } from '@components/flex'
import { Badge } from '@components/badge'
import { Link } from '@components/link'
import s from './alamanac-page.module.scss'

import type { Metadata, ResolvingMetadata } from 'next'

const client = sanityClient

// Generate metadata
export async function generateMetadata(
  { params }: { params: any },
  parent: ResolvingMetadata
): Promise<Metadata> {

  const { slug } = params;

  try {
    const article = await sanityClient.fetch(almanacsBySlugQuery, {
      slug
    })

    return {
      title: getOgTitle(article.title),
      description: article.excerpt,
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

// Generate the slugs/routes for the almanacs
export async function generateStaticParams() {

  try {
    const slugs = await sanityClient.fetch(
      almanacPaths,
      {
        next: {
          revalidate: 60,
        }
      }
    )
    return slugs.map((slug) => ({ slug }));
  } catch (error) {
    console.error(error)
    throw error
  }
}

// Render the almanac data
export default async function AlmanacSlugRoute({ params }) {
  const { slug } = params

  const almanac = await client.fetch(almanacsBySlugQuery, {
    slug
  })

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
            >{almanac.title}</Text>
          }
        />
        <aside className={s.categories}>
          <Text tag='p' type='expressive-body' size='body-base' collapse>Categories:</Text>
          {almanac.categories.map((category) => (
            <Link key={category.title} href={`/category/${category.slug}`}>
              <Badge text={category.title} />
            </Link>
          ))}
        </aside>
        <RichTextWrapper className={s['rich-text']}>
          <RichText value={almanac.content.content} />
        </RichTextWrapper>
      </SectionContainer>
    </>
  )
}