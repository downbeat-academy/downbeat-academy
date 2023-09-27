import { Text } from '@components/text'
import { Link } from '@components/link'
import { List } from '@components/text'
import { linkResolver } from '@utils/linkResolver'
import {
  Chord,
  MusicTextRenderer,
} from '@components/music-notation'
import { Blockquote } from '@components/blockquote'

const Components = {
  block: {
    h1: ({ children }) => <Text tag='h1' size='h1' type='expressive-headline' color='primary'>{children}</Text>,
    h2: ({ children }) => <Text tag='h2' size='h2' type='expressive-headline' color='primary'>{children}</Text>,
    h3: ({ children }) => <Text tag='h3' size='h3' type='expressive-headline' color='primary'>{children}</Text>,
    h4: ({ children }) => <Text tag='h4' size='h4' type='expressive-headline' color='primary'>{children}</Text>,
    h5: ({ children }) => <Text tag='h5' size='h5' type='expressive-headline' color='primary'>{children}</Text>,
    h6: ({ children }) => <Text tag='h6' size='h6' type='expressive-headline' color='primary'>{children}</Text>,
    normal: ({ children }) => <Text tag='p' size='body-base' type='expressive-body' color='primary'>{children}</Text>,
  },
  list: {
    bullet: ({ children }) => <List type='unordered'>{children}</List>,
    number: ({ children }) => <List type='ordered'>{children}</List>,
  },
  listItem: {
    bullet: ({ children }) => 
      <Text
        type='expressive-body'
        size='body-base'
        color='primary'
        tag='li'
        collapse
      >{children}</Text>,
    number: ({ children }) => 
      <Text
        type='expressive-body'
        size='body-base'
        color='primary'
        tag='li'
        collapse
      >{children}</Text>,
  },
  types: {
  blockquote: ({ value }) => (
    <Blockquote
      quote={value.quote}
      attribution={value.attribution}
      link={value.sourceUrl}
    />
  ),
  inlineChord: ({ value }) => <Chord {...value} />,
  inlineMusicText: ({ value }) => <MusicTextRenderer values={value.options} />,
  //   mainImage: ({ value }) => <p>This is an image.</p>,
  //   musicNotation: ({ value }) => <MusicNotation input={value} />,
  },
  marks: {
    link: ({ children, value }) => <Link href={value.href} type='primary'>{children}</Link>,
    internalLink: ({ children, value }) => <Link href={linkResolver(value.slug, value.type)} type='primary'>{children}</Link>
  },
}

export { Components }