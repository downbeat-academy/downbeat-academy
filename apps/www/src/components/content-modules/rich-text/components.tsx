import { Text, Blockquote, List } from 'cadence-core'
import { StyledLink } from '@components/link'
import { linkResolver } from '@utils/linkResolver'
import { InlineChord } from '@components/music-notation'

const components = {
  block: {
    h1: ({ children }) => <Text tag='h1' size='6x-large' type='expressive' category='headline' color='primary'>{children}</Text>,
    h2: ({ children }) => <Text tag='h2' size='5x-large' type='expressive' category='headline' color='primary'>{children}</Text>,
    h3: ({ children }) => <Text tag='h3' size='4x-large' type='expressive' category='headline' color='primary'>{children}</Text>,
    h4: ({ children }) => <Text tag='h4' size='3x-large' type='expressive' category='headline' color='primary'>{children}</Text>,
    h5: ({ children }) => <Text tag='h5' size='2x-large' type='expressive' category='headline' color='primary'>{children}</Text>,
    h6: ({ children }) => <Text tag='h6' size='x-large' type='expressive' category='headline' color='primary'>{children}</Text>,
    normal: ({ children }) => <Text tag='p' size='large' type='expressive' category='body' color='primary'>{children}</Text>,
    blockquote: ({ children }) => <Blockquote>{children}</Blockquote>
  },
  list: {
    bullet: ({ children }) => <List listType='ul' context='expressive'>{children}</List>,
    number: ({ children }) => <List listType='ol' context='expressive'>{children}</List>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  types: {
    blockquote: ({ value }) => {
      const { attribution, source, quote } = value
      return (
        <Blockquote attribution={attribution} source={source}>{quote}</Blockquote>
      )
    },
    inlineChord: ({ value }) => <InlineChord input={value} />,
    inlineMusicText: ({ value }) => { },
    mainImage: ({ value }) => { },
    musicNotation: ({ value }) => { },
    video: ({ value }) => <p>Video currently isn&apos;t supported.</p>
  },
  marks: {
    link: ({ children, value }) => <StyledLink href={value.href} type='primary' style='expressive'>{children}</StyledLink>,
    internalLink: ({ children, value }) => <StyledLink href={linkResolver(value.slug, value.type)} type='primary' style='expressive'>{children}</StyledLink>
  },
}

export { components }