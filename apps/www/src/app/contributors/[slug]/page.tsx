import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { readToken } from '@lib/sanity.api'
import { sanityClient } from '@lib/sanity.client'
import { contributorsBySlugQuery, contributorPaths } from '@lib/queries'
import { getSanityImageUrl } from '@utils/getSanityImage'
import { getOgTitle } from '@utils/metaHelpers'

import { SectionContainer } from '@components/section-container'
import { SectionTitle } from '@components/section-title'
import { Text } from '@components/text'
import { RichText } from '@components/rich-text'
import * as FeaturedItem from '@components/featured-item'
import { ListItem } from '@components/list'
import { linkResolver } from '@utils/linkResolver'
import { Flex } from '@components/flex'

import type { Metadata, ResolvingMetadata } from 'next'
import type { MetaProps } from '../../types/meta'

// Generate metadata
export async function generateMetadata(
  { params }: MetaProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  
  const { slug } = params;
  const client = sanityClient
  const contributor = await client.fetch(contributorsBySlugQuery, {
    slug
  })

  return {
    title: getOgTitle(contributor.name),
  }
}

// Generate the routes for each page
export async function generateStaticParams() {
  const client = sanityClient;
  const slugs = await client.fetch(contributorPaths);
  return slugs.map((slug) => ({ slug }));
}

// Render the page data
export default async function ContributorSlugRoute({ params }) {
  const { slug } = params
  const preview = draftMode().isEnabled ? { token: readToken } : undefined;
  const contributor = await sanityClient.fetch(contributorsBySlugQuery, {
    slug,
  })

  if (!contributor && !preview) {
    notFound();
  }

  return (
    <>
      <SectionContainer>
        <FeaturedItem.Root>
          <FeaturedItem.Title>
            <Text
              tag='h1'
              size='h1'
              type='expressive-headline'
              color='high-contrast'
              collapse
            >{contributor.name}</Text>
          </FeaturedItem.Title>
          <FeaturedItem.Description>
            <RichText value={contributor.biography.content} />
          </FeaturedItem.Description>
          <FeaturedItem.Image
            image={getSanityImageUrl(contributor.image.image.asset).url()}
            alt={contributor.name}
          />
        </FeaturedItem.Root>
      </SectionContainer>
      <SectionContainer>
        <SectionTitle
          title={
            <Text
              tag='h2'
              type='expressive-headline'
              size='h2'
              color='primary'
              collapse
            >Contributions</Text>
          }
        />
        <Flex direction='column' tag='section'>
          {contributor.content.map(c => {
            return (
              <ListItem
                key={c._id}
                title={c.title}
                description={c.excerpt}
                url={linkResolver(c.slug, c.type)}
              />
            )
          })}
        </Flex>
      </SectionContainer>
    </>
  )
}