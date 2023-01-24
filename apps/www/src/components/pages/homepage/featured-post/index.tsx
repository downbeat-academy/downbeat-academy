import Image from 'next/image'
import Link from 'next/link'
import { getSanityImageUrl } from '@utils/getSanityImage'
import { Flex, Text } from 'cadence-core'
import { linkResolver } from '@utils/linkResolver'
import { sanityClient } from '@lib/sanity.client'

import { FeaturedPostProps } from "./types"
import s from '@styles/pages/homepage/featured-post/featuredPost.module.scss'
import { Categories } from './Categories'
import { PostMeta } from './PostMeta'

const FeaturedPost = ({ input }: FeaturedPostProps) => {

  // console.log(input)
  const {
    slug,
    categories,
    title,
    excerpt,
    authors,
    date,
    image
  } = input;

  const imageUrl = getSanityImageUrl(image.asset)

  return (
    <section className={s.wrapper}>
      <div className={s.image}>
        <Image
          src={imageUrl}
          alt='image'
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      <aside className={s.content}>
        <Flex direction='column' gap='base' padding='x-large' className={s.main}>
          <Flex direction='row' gap='small'><Categories categories={categories} /></Flex>
          <Link href={linkResolver(slug, 'article')} className={s.title}>
            <Text
              tag='h1'
              size='5x-large'
              type='expressive'
              category='headline'
              collapse={true}
            >{title}</Text>
          </Link>
          <Text
            tag='p'
            size='large'
            type='expressive'
            category='body'
            collapse={true}
            color='primary'
          >{excerpt}</Text>
        </Flex>
        <div className={s.divider} aria-hidden='true'></div>
        <PostMeta
          authors={authors}
          date={date}
        />
      </aside>
    </section>
  )
}

export { FeaturedPost }