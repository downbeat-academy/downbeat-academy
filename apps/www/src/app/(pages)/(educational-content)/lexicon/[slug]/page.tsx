import { sanityClient } from "@lib/sanity/sanity.client";
import { lexiconPageQuery } from "@lib/queries";
import { getOgTitle } from "@utils/metaHelpers";
import { Text } from "@components/text";
import { SectionContainer } from "@components/section-container";
import { SectionTitle } from "@components/section-title";
import { RichText, RichTextWrapper } from "@components/rich-text";
import { Badge } from "@components/badge";
import { Link } from "@components/link";

const client = sanityClient;

export async function generateStaticParams() {
  try {
    const lexicons = await sanityClient.fetch(lexiconPageQuery, {
      revalidate: 60,
    });

    const slugs = lexicons.map((lexicon) => {
      // return `${lexicon.artist}-${lexicon.album}-${lexicon.track}-${lexicon.timestamp}`
      return 'john-coltrane'
    })

    return slugs.map((slug) => ({ slug }));
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default async function LexiconSlugRoute({ params }) {
  const { artist, album, track, timestamp } = params;

  const lexicon = await client.fetch(lexiconPageQuery, {
    artist,
    album,
    track,
    timestamp,
  });

  return (
    <>
      <SectionContainer>
        <SectionTitle
          background="primary"
          title={
            <Text tag="h1" type="expressive-headline" size="h1" color="brand" collapse>
              {lexicon.artist}
            </Text>
          }
          subtitle={
            <Text tag="p" type="expressive-body" size="body-base" color="primary" collapse>
              {lexicon.album}
            </Text>
          }
        />
        {/* <RichTextWrapper>
          <RichText content={lexicon.description} />
        </RichTextWrapper> */}
      </SectionContainer>
    </>
  );
}