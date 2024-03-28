import { sanityClient } from "@lib/sanity/sanity.client";
import { lexiconPaths, lexiconsBySlugQuery } from "@lib/queries";
import { getOgTitle } from "@utils/metaHelpers";
import { Text } from "@components/text";
import { SectionContainer } from "@components/section-container";
import { RichText } from "@components/rich-text";
import { Badge } from "@components/badge";
import { Flex } from "@components/flex";
import { getLexiconSlug } from "../getLexiconSlug";
import { getTime } from "@utils/getTime";

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
      <Flex direction='column' alignItems='start' gap='2x-small' justifyContent='space-between' key={item.value}>
        <Text tag='p' type='productive-body' size='body-large' color='primary' collapse>{item.title}:</Text>
        <Badge text={item.value} type='neutral' size='large' />
      </Flex>
    )
  })

  console.log(lexicon)

  return (
    <>
      <SectionContainer>
        <Flex
          direction='row'
          padding='large'
          background='primary'
          gap='3x-large'
        >
          <Flex
            gap='large'
            direction='column'
          >
            {renderMetadata}
          </Flex>
          <Flex
            direction='column'
            gap='medium'
          >
            <RichText value={lexicon.description.content} />
          </Flex>
        </Flex>
      </SectionContainer>
    </>
  );
}