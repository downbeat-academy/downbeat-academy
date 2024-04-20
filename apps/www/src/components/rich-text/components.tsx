import { Text } from '@components/text'
import { Link } from '@components/link'
import { List } from '@components/text'
import { linkResolver } from '@utils/link-resolver'
import {
  Chord,
  MusicTextRenderer,
  MusicNotation,
} from '@components/music-notation'
import { Blockquote } from '@components/blockquote'
import { MainImage } from '@components/images'
import { FileDownload } from '@components/file-download'
import { HandbookReference } from '@components/handbook-reference'

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
    mainImage: ({ value }) => <MainImage image={value.image.asset} altText={value.alternativeText} caption={value.caption} />,
    musicNotation: ({ value }) => {
      return (
        <MusicNotation
          files={value.files}
          title={value.title}
          description={value.description}
        />
      )
    },
    fileDownload: ({ value }) => {
      return (
        <FileDownload
          title={value.title}
          description={value.description}
          file={value.file}
        />
      )
    },
    handbookReference: ({ value }) => {
      return (
        <HandbookReference
          text={value.text}
          title={value.reference.title}
          excerpt={value.reference.excerpt}
          link={linkResolver(value.reference.slug, 'handbook')}
          categories={value.reference.categories}
        />
      )
    }
  },
  marks: {
    link: ({ children, value }) => <Link href={value.href} type='primary'>{children}</Link>,
    internalLink: ({ children, value }) => <Link href={linkResolver(value.slug, value.type)} type='primary'>{children}</Link>
  },
}

export { Components }