import { groq } from 'next-sanity'

export const lexiconsBySlugQuery = groq`
  *[_type == 'lexicon' && slug.current == $slug][0] {
    _id,
    _key,
    artist,
    album,
    track,
    timestamp,
    style,
    length,
    chordProgression,
    year,
    "slug": slug.current,
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
  *[_type == 'lexicon'].slug.current
`

export const lexiconPageQuery = groq`
  *[_type == 'lexicon'] {
    "id": _id,
    _key,
    artist,
    album,
    track,
    timestamp,
    style,
    length,
    chordProgression,
    audio,
    "slug": slug.current,
  }
`
