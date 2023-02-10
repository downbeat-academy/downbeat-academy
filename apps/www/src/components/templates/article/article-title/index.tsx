import Link from 'next/link'
import Image from 'next/image'
import { Text, Badge, Flex, Avatar, AvatarGroup } from 'cadence-core'
import { linkResolver } from '@utils/linkResolver'
import { getSanityImageUrl } from '@utils/getSanityImage'
import { prettyDate } from '@utils/dateFormat'
import s from './articleTitle.module.scss'

const ArticleTitle = ({
  title,
  excerpt,
  categories,
  authors,
  date,
  updateDate
}) => {

  const getCategories = categories.map(category => {
    console.log(category);
    return (
      <Link
        href={linkResolver(category.slug.current, category._type)}
        className={s.badgeLink}
        key={category._id}
      >
        <Badge
          text={category.title}
          type='informational'
          style='fill'
        />
      </Link>
    )
  })

  const getAuthorImages = authors.slice(0, 3).map((author) => {
    const image = (
      <Image 
        src={getSanityImageUrl(author.avatar.image.asset)}
        alt={author.name}
        width={100}
        height={100}
      />
    )

    return (
      <Link href={linkResolver(author.slug.current, 'contributor')} key={author._id}>
        <Avatar imageObject={image} size='medium' />
      </Link>
    )
  })

  const getAuthorNames = authors.slice(0, 3).map((author) => {
		return (
			<Link
				href={linkResolver(author.slug.current, 'contributor')}
				key={author._id}
				className={s.authorLink}
			>
				{author.name}{' '}
			</Link>
		)
	})

  return (
    <div className={s.wrapper}>
      <div className={s.title}>
        <Flex direction='row' gap='base'>{getCategories}</Flex>
        <Text
          type='expressive'
          category='headline'
          tag='h1'
          size='6x-large'
          color='brand'
          collapse
        >{title}</Text>
      </div>
      <div className={s.right}>
        <div className={s.excerpt}>
          <Text
            type='expressive'
            category='body'
            tag='p'
            size='large'
            color='primary'
            collapse
          >{excerpt}</Text>
        </div>
        <div className={s.meta}>
          <AvatarGroup
            avatars={getAuthorImages}
            overlap={true}
            isInteractive={authors.length > 1 ? true : false}
          />
          <Text tag='p' size='small' category='body'><strong>{getAuthorNames}</strong></Text>
        </div>
      </div>
    </div>
  )
}

export { ArticleTitle }