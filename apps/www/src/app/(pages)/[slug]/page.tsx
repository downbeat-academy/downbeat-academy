import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { readToken } from '@lib/sanity.api'
import { sanityClient } from '@lib/sanity.client'
import { pagesBySlugQuery, pagePaths } from '@lib/queries'
import { getOgTitle } from '@utils/metaHelpers'

import { SectionContainer } from '@components/section-container'
import { SectionTitle } from '@components/section-title'
import { Text } from '@components/text'
import { ModuleRenderer } from '@components/module-content'

import type { Metadata, ResolvingMetadata } from 'next'
import type { MetaProps } from '../../types/meta'

// Generate metadata
export async function generateMetadata(
  { params }: MetaProps,
  parent: ResolvingMetadata
): Promise<Metadata> {

  const { slug } = params;
  const client = sanityClient
  const page = await client.fetch(pagesBySlugQuery, {
    slug
  })

  const { title } = page.metadata

  return {
    title: getOgTitle(title),
    description: page.metadata.description,
  }
}

// Generate the slugs/routes for each page
export async function generateStaticParams() {
  const client = sanityClient
  const slugs = await client.fetch(
    pagePaths,
    {
      next: {
        revalidate: 60,
      },
    }
  )
  return slugs.map((slug) => ({ slug }));
}

// Render the page data
export default async function PageSlugRoute({ params }) {
  const { slug } = params
  const preview = draftMode().isEnabled ? { token: readToken } : undefined;
  const page = await sanityClient.fetch(pagesBySlugQuery, {
    slug,
  })

  if (!page && !preview) {
    notFound();
  }

  return (
    <>
      <SectionContainer>
        <SectionTitle
          background='primary'
          title={
            <Text
              tag='h1'
              size='h1'
              type='expressive-headline'
              color='brand'
              collapse
            >{page.title}</Text>
          }
        />
        <ModuleRenderer
          modules={page.moduleContent}
        />
      </SectionContainer>
    </>
  )
}

