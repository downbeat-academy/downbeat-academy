import Image from 'next/image'
import Link from 'next/link'
import { parseISO, format } from 'date-fns'
import { Flex, Text, Badge, Avatar } from 'cadence-core'
import { urlFor } from '@utils/getSanityImage'
import { linkResolver } from '@utils/linkResolver'

import { FeaturedPostProps } from "./types"
import s from '@styles/pages/homepage/featured-post/featuredPost.module.scss'
import { Categories } from './Categories'
import { PostMeta } from './PostMeta'

const FeaturedPost = ({ input }: FeaturedPostProps) => {

  return (
    <section className={s.wrapper}>
      <div className={s.image}>
        {/* <Image src={urlFor(input.image._id)} alt='Featured post image' /> */}
      </div>
      <aside className={s.content}>
        <Flex direction='column' gap='base' padding='x-large' className={s.main}>
          <Flex direction='row' gap='small'><Categories categories={input.categories} /></Flex>
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
        <PostMeta
          authors={input.authors}
          date={input.date}
        />
        {/* <Flex direction='row' className={s.author} align='center'>
          {authorImages}
          <Flex direction='column' className={s.meta} gap='2x-small'>
            <Text tag='p' size='small' category='body' type='productive' collapse={true} color='strong'><strong>{getAuthors}</strong></Text>
            <Text tag='p' size='small' category='body' type='productive' collapse={true} color='primary'><strong>Published {articleDate}</strong></Text>
            <Text tag='p' size='small' category='body' type='productive' collapse={true} color='primary'><strong></strong></Text>
          </Flex>
        </Flex> */}
      </aside>
    </section>
  )
}

export { FeaturedPost }