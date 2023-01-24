import Link from 'next/link'
import Image from 'next/image'
import { Flex, Text, Avatar, AvatarGroup } from 'cadence-core'
import { getSanityImageUrl } from '@utils/getSanityImage'
import { linkResolver } from '@utils/linkResolver'
import { prettyDate } from '@utils/dateFormat'
import { PostCardProps } from "./types"
import s from '@styles/components/post/postCard.module.scss'

const PostCard = ({
  image,
  title,
  slug,
  authors,
  date,
}: PostCardProps) => {

  const getAuthorNames = authors.slice(0, 1).map(author => {
    return author.name
  })

  const getAuthorImages = authors.slice(0, 3).map(author => {
    const image = <Image src={getSanityImageUrl(author.avatar.image.asset)} alt={author.name} width={40} height={40} />

    return <Avatar imageObject={image} size='small' key={author._id} />
  })

  const imageUrl = getSanityImageUrl(image.image.asset)

  // console.log(image.image.asset)

  return (
    <Link href={linkResolver(slug, 'article')} className={s.wrapper}>
      <article>
        <div className={s.imageWrapper}>
          <Image
            src={imageUrl}
            alt={image.alternativeText}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <Flex direction='column' gap='base' padding='medium' className={s.mainContent}>
          <Text tag='h4' category='headline' type='expressive' color='primary' size='large' collapse>{title}</Text>
          <Flex direction='row' gap='base' align='center' className={s.author}>
            <AvatarGroup avatars={getAuthorImages} overlap={true} overlapSpacing='default' />
            <Flex direction='column' gap='none'>
              <Text tag='p' category='body' type='productive' color='secondary' size='small' collapse>{getAuthorNames}</Text>
              <Text tag='p' category='body' type='productive' color='secondary' size='small' collapse>{prettyDate(date, 'MMM do, yyyy')}</Text>
            </Flex>
          </Flex>
        </Flex>
      </article>
    </Link>
  )
}

export { PostCard }