import Image from 'next/image'
import classnames from 'classnames'
import { Text } from '@components/text'
import { Avatar, AvatarGroup } from '@components/avatar'
import { Link } from '@components/link'
import { Flex } from '@components/flex'
import { getSanityImageUrl } from '@utils/getSanityImage'
import { linkResolver } from '@utils/linkResolver'
import s from './author-metadata.module.scss'

import type { AuthorMetadataProps } from './types'

const AuthorMetadata = ({
  authors,
  avatarSize = 'medium',
  children,
  className,
  date,
}: AuthorMetadataProps) => {

  const classes = classnames(
    s.root,
    className,
  )

  const mapAuthorImages = authors.map(authorImage => {
    return (
      <Link href={linkResolver(authorImage.slug, 'contributor')} key={authorImage.name}>
        <Avatar
          imageObject={
            <Image
              // @ts-ignore
              src={getSanityImageUrl(authorImage.image.image.asset).url()}
              alt={authorImage.name}
              width={64}
              height={64}
            />
          }
          name={authorImage.name}
          size={avatarSize}
        />
      </Link>
    )
  })

  const mapAuthorNames = authors.map(authorLink => {
    return (
      <Link
        type='secondary'
        href={linkResolver(authorLink.slug, 'contributor')}
        key={authorLink.name}
      >
        <strong>
          {authorLink.name}
        </strong>
        {' '}
      </Link>
    )
  })

  return (
    <Flex
      tag='div'
      direction='column'
      gap='medium'
      className={classes}
    >
      <Flex tag='div' direction='row' gap='medium'>
        <AvatarGroup spacing='overlap-large'>
          {mapAuthorImages}
        </AvatarGroup>
        <Flex tag='div' direction='column' justifyContent='center' gap='2x-small'>
          <Text tag='p' type='productive-body' size='body-small' collapse>
            {mapAuthorNames}
          </Text>
          <Text tag='p' type='productive-body' size='body-small' collapse>Published on {date}</Text>
        </Flex>
      </Flex>
      {children}
    </Flex>
  )
}

export { AuthorMetadata }