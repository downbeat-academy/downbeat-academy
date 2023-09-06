import Image from 'next/image'
import classnames from 'classnames'
import { format } from 'date-fns'
import { Text } from '@components/text'
import { Avatar, AvatarGroup } from '@components/avatar'
import { Link } from '@components/link'
import { Flex } from '@components/flex'
import { getSanityImageUrl } from '@app/utils/getSanityImage'
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
    console.log(authorImage)
    return (
      // @ts-ignore
      <Link href={linkResolver(authorImage.slug, 'contributor')} key={authorImage.name}>
        <Avatar
          // @ts-ignore
          imageUrl={getSanityImageUrl(authorImage.image.image.asset).url()}
          name={authorImage.name}
          size={avatarSize}
        />
      </Link>
    )
  })

  const mapAuthorNames = authors.map(authorLink => {
    return (
      <strong key={authorLink.name}>
        <Link
          type='secondary'
          href={linkResolver(authorLink.slug, 'contributor')}
        >
          {authorLink.name}
        </Link>
        {' '}
      </strong>
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