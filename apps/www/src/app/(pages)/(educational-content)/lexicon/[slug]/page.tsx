import { sanityClient } from "@lib/sanity/sanity.client";
import { lexiconPaths, lexiconsBySlugQuery } from "@lib/queries";
import { getOgTitle } from "@utils/metaHelpers";
import { getTime } from "@utils/getTime";
import { getSanityUrl } from "@utils/getSanityUrl";
import { Text } from "@components/text";
import { SectionContainer } from "@components/section-container";
import { SectionTitle } from "@components/section-title";
import { RichText } from "@components/rich-text";
import { Badge } from "@components/badge";
import { Flex } from "@components/flex";
import { MusicNotation } from "@components/music-notation";
import { getLexiconSlug } from "../getLexiconSlug";
import { AudioPlayer } from '@components/audio'

import s from './lexicon-page.module.scss'

const client = sanityClient;

export async function generateMetadata({ params }: { params: any }) {
  const { slug } = params;

  try {
    const lexicon = await sanityClient.fetch(lexiconsBySlugQuery, {
      slug,
    });

    return {
      title: getOgTitle(`${lexicon.artist} - ${lexicon.album} - ${lexicon.track} - ${getTime(lexicon.timestamp).totalTime}`),
      description: lexicon.excerpt,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function generateStaticParams() {
  try {
    const lexicons = await sanityClient.fetch(lexiconPaths, {
      revalidate: 60,
    });
    return lexicons.map((lexicon) => ({
      slug: getLexiconSlug(lexicon),
    }));
  } catch (error) {
    {
      console.error(error);
      throw error;
    }
  }
}

export default async function LexiconSlugRoute({ params }) {
  const { slug } = params;
  const lexicon = await client.fetch(lexiconsBySlugQuery, { slug })
  const {
    artist,
    album,
    track,
    timestamp,
    style,
    length,
    chordProgression,
    description,
    excerpt,
    audio
  } = lexicon

  const lexiconMetadata = [
    {
      title: 'Artist',
      value: artist,
    },
    {
      title: 'Album',
      value: album,
    },
    {
      title: 'Track',
      value: track,
    },
    {
      title: 'Timestamp',
      value: getTime(timestamp).totalTime,
    },
    {
      title: 'Style',
      value: style,
    },
    {
      title: 'Length',
      value: length,
    },
    {
      title: 'Chord Progression',
      value: chordProgression,
    },
  ]

  const renderMetadata = lexiconMetadata.map((item) => {
    return (
      <Flex direction='column' alignItems='start' gap='2x-small' key={item.value}>
        <Text tag='p' type='productive-body' size='body-base' color='primary' collapse>{item.title}:</Text>
        <Badge text={item.value} type='neutral' size='large' />
      </Flex>
    )
  })

  const audioFile = getSanityUrl(audio.asset._ref,)
  console.log(audioFile)

  return (
    <>
      <SectionContainer>
        <SectionTitle background='primary'>
          <Flex
            direction='row'
            gap='large'
            justifyContent='space-between'
            wrap
          >
            {renderMetadata}
          </Flex>
        </SectionTitle>
        <section className={s.excerpt}>
          <Flex
            direction='column'
            gap='medium'
            className={s['excerpt-content']}
          >
            <RichText value={description.content} />
            <SinglePlayer />
            <audio src={audioFile} controls />
            <MusicNotation files={excerpt.files} collapse />
          </Flex>
        </section>
      </SectionContainer>
    </>
  );
}