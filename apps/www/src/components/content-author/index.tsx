import Link from 'next/link'
import Image from 'next/image'
import { Text, Flex, Avatar, AvatarGroup } from 'cadence-core'
import { linkResolver } from '@utils/linkResolver'
import { getSanityImageUrl } from '@utils/getSanityImage'
import { prettyDate } from '@utils/dateFormat'
import s from './contentAuthor.module.scss'
import { ContentAuthorProps } from './types'

const ContentAuthor = ({
  authors,
  date,
  updatedDate,
  avatarSize,
}: ContentAuthorProps) => {

  const authorImages = authors.map(author => {
    const image = (
      <Image
        src={getSanityImageUrl(author.avatar.image.asset)}
        alt={author.name}
        width={100}
        height={100}
      />
    )

    return (
      <Link href={linkResolver(author.slug, 'contributor')} key={author._id}>
        <Avatar
          imageObject={image}
          // @ts-ignore
          size={avatarSize} />
      </Link>
    )
  })

  const authorNames = authors.map(({ name, _id, slug }) => {
    return (
      <Text
        tag='p'
        size='small'
        category='body'
        color='primary'
        collapse
        key={_id}
      >
        <strong>
          <Link
            href={linkResolver(slug, 'contributor')}
            className={s.authorLink}
          >
            {name}
          </Link>
        </strong>
      </Text>
    )
  })

  const publishedDate = prettyDate(date, 'MMM, do, yyyy')

  return (
    <div className={s.wrapper}>
      <AvatarGroup
        avatars={authorImages}
        overlap={true}
        isInteractive={authors.length > 1 ? true : false}
      />
      <Flex direction='column' gap='2x-small'>
        <Flex direction='row' gap='x-small'>{authorNames}</Flex>
        {date &&        
          <Text 
            tag='p' 
            size='small' 
            category='body' 
            color='secondary' 
            collapse
          >
            {publishedDate}
          </Text>
        }
      </Flex>
    </div>
  )
}

export { ContentAuthor }