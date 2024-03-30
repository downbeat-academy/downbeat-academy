import { groq } from 'next-sanity'

export const lexiconsBySlugQuery = groq`
  *[_type == 'lexicon'][0] {
    _id,
    _key,
    artist,
    album,
    track,
    timestamp,
    style,
    length,
    chordProgression,
    description {
      ...,
      _type == "richText" => {
        content[] {
          ...,
          children[] {
            ...,
            _type == "handbookReference" => {
              reference-> {
                ...,
                "slug": slug.current,
                title,
                excerpt,
                categories[]-> {
                  _id,
                  title,
                }
              }
            }
          }
        }
      }
    },
    excerpt,
    audio[],
  }
`

export const lexiconPaths = groq`
  *[_type == 'lexicon'] {
    _key,
    _id,
    artist,
    album,
    track,
    timestamp,
  }
`

export const lexiconPageQuery = groq`
  *[_type == 'lexicon'] {
    _id,
    _key,
    artist,
    album,
    track,
    timestamp,
    style,
    length,
    chordProgression,
    audio,
  }
`