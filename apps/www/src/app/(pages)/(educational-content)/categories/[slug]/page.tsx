import { sanityClient } from '@lib/sanity/sanity.client'
import { categoriesBySlugQuery, categoryPaths } from '@lib/queries'
import { getOgTitle } from '@utils/metaHelpers'
import { linkResolver } from '@utils/linkResolver'
import { Text } from '@components/text'
import { SectionContainer } from '@components/section-container'
import { SectionTitle } from '@components/section-title'

import type { Metadata, ResolvingMetadata } from 'next'
import type { MetaProps } from '../../../../../types/meta'
import { ListItem } from '@components/list'

const client = sanityClient

// Generate metadata
export async function generateMetadata(
  { params }: MetaProps,
  parent: ResolvingMetadata
): Promise<Metadata> {

  const { slug } = params;

  try {
    const category = await client.fetch(categoriesBySlugQuery, { slug })
    return {
      title: getOgTitle(category.title)
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

// Generate slugs/routes for categories
export async function generateStaticParams() {
  try {
    const slugs = await client.fetch(
      categoryPaths,
      {
        revalidate: 60,
      }
    )
    return slugs.map((slug) => ({ slug }))
  } catch (error) {
    console.error(error)
    throw error
  }
}

// Render the category data
export default async function CategorySlugRoute({ params }) {
  const { slug } = params

  try {
    const category = await client.fetch(
      categoriesBySlugQuery,
      { slug },
      {
        next: {
          revalidate: 60,
        }
      }
    )

    const renderReferences = category.references.map(reference => {
      return (
        <ListItem
          key={reference._id}
          title={reference.title}
          description={reference.excerpt}
          url={linkResolver(reference.slug, reference._type)}
        />
      )
    })

    return (
      <SectionContainer>
        <SectionTitle
          background='success'
          title={
            <Text
              tag='h1'
              type='expressive-headline'
              size='h1'
              collapse
              color='high-contrast'
            >Category: {category.title}</Text>
          }
        />
        {renderReferences}
      </SectionContainer>
    )
  } catch (error) {
    console.error(error)
    throw error
  }
}