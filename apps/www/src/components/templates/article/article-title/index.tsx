import Link from 'next/link'
import Image from 'next/image'
import { Text, Badge, Flex } from 'cadence-core'
import { linkResolver } from '@utils/linkResolver'
import { getSanityImageUrl } from '@utils/getSanityImage'
import s from './articleTitle.module.scss'
import { ContentAuthor } from '@components/content-author'

const ArticleTitle = ({
  title,
  excerpt,
  categories,
  authors,
  date,
  updatedDate,
}) => {

  const getCategories = categories.map(category => {
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
        <div className={s.authors}>
          <ContentAuthor
            authors={authors}
            date={date}
          />
        </div>
      </div>
    </div>
  )
}

export { ArticleTitle }