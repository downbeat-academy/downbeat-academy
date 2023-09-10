import Img from 'next/image'
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { readToken } from '@lib/sanity.api'
import { sanityClient } from '@lib/sanity.client'
import { contributorsBySlugQuery, contributorPaths } from '@lib/queries'
import { getSanityImageUrl } from '@utils/getSanityImage'

import { SectionContainer } from '@components/section-container'
import { SectionTitle } from '@components/section-title'
import { Text } from '@components/text'
import { RichText } from '@components/rich-text'
import { Avatar } from '@components/avatar'

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

  console.log(contributor)

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
              >{contributor.name}</Text>
            }
          />
          <Avatar
            size='large'
            imageObject={
              <Img
                src={getSanityImageUrl(contributor.image.image.asset).url()}
                alt={contributor.name}
                width={80}
                height={80}
              />
            }
          />
          <RichText value={contributor.biography.content} />
      </SectionContainer>
    </>
  )
}