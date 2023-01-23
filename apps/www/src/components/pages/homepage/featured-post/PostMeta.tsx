import Link from 'next/link'
import { Flex, Avatar, Text } from 'cadence-core'
import { prettyDate } from '@utils/dateFormat'
import { linkResolver } from '@utils/linkResolver'
import s from '@styles/pages/homepage/featured-post/postMeta.module.scss'

const PostMeta = ({ authors, date }) => {

  const postDate = prettyDate(date, 'MMM do, yyyy');

  const getAuthorNames = authors.slice(0, 3).map(author => {
    return (
      <Link
        href={linkResolver(author.slug, 'contributor')}
        key={author._id}
      >{author.name} </Link>
    )
  })

  const getAuthorImages = authors.slice(0, 3).map(authorImage => {
    return (<Avatar key={authorImage._id} />)
  })

  return (
    <div className={s.wrapper}>
      <Text
        tag='p'
        size='small'
        category='body'
        type='productive'
        collapse={true}
        color='strong'
      ><strong>{getAuthorNames}</strong></Text>
      <Text
        tag='p'
        size='small'
        category='body'
        type='productive'
        collapse={true}
        color='primary'
      ><strong>Published {postDate}</strong></Text>
    </div>
  )
}

export { PostMeta }