import { groq } from 'next-sanity'

export const mainNavQuery = groq`
  *[_type == 'navigation' && title == 'Header Navigation'][0] {
    title,
    links[type == 'customInternal'][],
  }
`

export const bannerQuery = groq`
  *[_type == 'banner' && active == true][0] {
    title,
    active,
    headline,
    description,
  }
`
