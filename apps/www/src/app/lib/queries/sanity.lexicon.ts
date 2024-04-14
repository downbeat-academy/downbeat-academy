import { groq } from 'next-sanity'

export const lexiconsBySlugQuery = groq`
  *[_type == 'lexicon' && _id == $_id][0] {
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

// export const lexiconPaths = groq`
//   *[_type == 'lexicon'] {
//     _key,
//     "id": _id,
//     artist,
//     album,
//     track,
//     timestamp,
//     year,
//   }
// `

export const lexiconPaths = groq`
  *[_type == 'lexicon'] {
    _id,
    artist,
    album,
    track,
    timestamp,
  }
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
  }
`