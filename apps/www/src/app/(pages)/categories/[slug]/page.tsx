import { sanityClient } from '@lib/sanity.client'
import { categoriesBySlugQuery, categoryPaths } from '@lib/queries'
import { getOgTitle } from '@utils/metaHelpers'
import { linkResolver } from '@utils/linkResolver'
import { Text } from '@components/text'
import { SectionContainer } from '@components/section-container'
import { SectionTitle } from '@components/section-title'

import type { Metadata, ResolvingMetadata } from 'next'
import type { MetaProps } from '../../../types/meta'
import { ListItem } from '@components/list'

// Generate metadata
export async function generateMetadata(
  { params }: MetaProps,
  parent: ResolvingMetadata
): Promise<Metadata> {

  const { slug } = params;
  const client = sanityClient
  const category = await client.fetch(categoriesBySlugQuery, {
    slug
  })

  return {
    title: getOgTitle(category.title)
  }
}

// Generate slugs/routes for categories
export async function generateStaticParams() {
  const slugs = await sanityClient.fetch(
    categoryPaths,
    {
      next: {
        revalidate: 60,
      }
    }
  )

  return slugs.map((slug) => ({ slug }))
}

// Render the category data
export default async function CategorySlugRoute({ params }) {
  const { slug } = params
  const category = await sanityClient.fetch(
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
}