import { Flex, Text, Badge, Avatar } from 'cadence-core'
import { FeaturedPostProps } from "./types"
import s from '@styles/pages/homepage/featuredPost.module.scss'

const FeaturedPost = ({ input }: FeaturedPostProps) => {

  const categories = input.categories.slice(0, 2).map(category => {
    return <Badge type='outline' text={category.title} key={category.title} />
  })

  const authorImages = input.authors.slice(0, 3).map(authorImage => {
    return (<Avatar key={authorImage._id} />)
  })

  const authorNames = input.authors.slice(0, 3).map(authorName => {
    return authorName.name + ' '
  })

  const articleDate = input.date;
  console.log(articleDate)

  // console.log(articleDate.toLocaleDateString('en-us'))

  return (
    <section className={s.wrapper}>
      <div className={s.image}>
        <p>Image goes here</p>
      </div>
      <aside className={s.content}>
        <Flex direction='column' gap='base' padding='x-large' className={s.main}>
          <Flex direction='row' gap='small'>{categories}</Flex>
          <Text
            tag='h1'
            size='5x-large'
            type='expressive'
            category='headline'
            collapse={true}
            className={s.title}
          >{input.title}</Text>
          <Text
            tag='p'
            size='large'
            type='expressive'
            category='body'
            collapse={true}
            color='primary'
          >{input.excerpt}</Text>
        </Flex>
        <div className={s.divider}></div>
        <Flex direction='row' className={s.author} align='center'>
          {authorImages}
          <Flex direction='column' className={s.meta} gap='2x-small'>
            <Text tag='p' size='small' category='body' type='productive' collapse={true} color='strong'><strong>{authorNames}</strong></Text>
            <Text tag='p' size='small' category='body' type='productive' collapse={true} color='primary'><strong>Published {input.date}</strong></Text>
            <Text tag='p' size='small' category='body' type='productive' collapse={true} color='primary'><strong></strong></Text>
          </Flex>
        </Flex>
      </aside>
    </section>
  )
}

export { FeaturedPost }