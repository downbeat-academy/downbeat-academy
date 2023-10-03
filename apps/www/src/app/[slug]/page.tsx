import { readToken } from '@lib/sanity.api'
import { sanityClient } from '@lib/sanity.client'
import { pagesBySlugQuery, pagePaths } from '@lib/queries'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import { SectionContainer } from '@components/section-container'
import { SectionTitle } from '@components/section-title'
import { Text } from '@components/text'
import { ModuleRenderer } from '@components/module-content'

import * as Tabs from '@components/tabs'

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
        <Tabs.Root defaultValue='opt-1'>
          <Tabs.List>
            <Tabs.Trigger value='opt-1'>
              Option 1
            </Tabs.Trigger>
            <Tabs.Trigger value='opt-2'>
              Option 2
            </Tabs.Trigger>
            <Tabs.Trigger value='opt-3'>
              Option 3
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value='opt-1'>
            Content for tab 1
          </Tabs.Content>
          <Tabs.Content value='opt-2'>
            Content for tab 2
          </Tabs.Content>
          <Tabs.Content value='opt-3'>
            Content for tab 3
          </Tabs.Content>
        </Tabs.Root>
      </SectionContainer>
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

