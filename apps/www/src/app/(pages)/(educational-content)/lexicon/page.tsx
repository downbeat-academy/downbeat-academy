import { sanityClient } from '@lib/sanity/sanity.client'
import { lexiconPageQuery } from '@lib/queries'
import { getTime } from "@utils/getTime";

import { SectionContainer } from '@components/section-container'
import { SectionTitle } from '@components/section-title'
import { Text } from '@components/text'
import { Link } from '@components/link'

import { LexiconItem } from './lexicon-item'

import type { Metadata } from 'next'

async function getLexicons() {
  const res = sanityClient.fetch(
    lexiconPageQuery,
    {
      revalidate: 60,
    }
  )

  if (!res) {
    throw new Error('Failed to fetch data.');
  }

  return res;
}

export default async function LexiconPage() {
  const lexicons = await getLexicons();

  console.log(lexicons)

  const renderLexiconItems = lexicons.map((lexicon) => {
    const time = getTime(lexicon.timestamp).totalTime;
    return (
      <LexiconItem
        key={lexicon._key}
        title={lexicon.artist}
        url={lexicon.slug}
        album={lexicon.album}
        track={lexicon.track}
        timestamp={time}
      />
    )
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
            >Jazz Language Lexicon</Text>
          }
          subtitle={
            <Text tag='p' type='expressive-body' size='body-base' color='primary' collapse>
              The Downbeat Academy Jazz Lexicon is a collection and categorization of language excerpts from across the recorded jazz idion.
            </Text>
          }
        />
        <div>
          {renderLexiconItems}
        </div>
      </SectionContainer>
    </>
  )
}