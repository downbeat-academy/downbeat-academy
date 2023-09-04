import { Text } from '@components/text'
import { Avatar, AvatarGroup } from '@components/avatar'
import { Badge } from '@components/badge'
import { Link } from '@components/link'
import { Flex } from '@components/flex'
import s from './featured-item.module.scss'

import type { FeaturedItemProps } from "./types"

const FeaturedItem = ({
  title,
  description,
  authors,
}: FeaturedItemProps) => {
  return (
    <article className={s.root}>
      <Flex
        tag='div'
        background='brand'
        padding='3x-large'
        gap='x-large'
        className={s.title}
      >
        <Text
          tag='h1'
          size='h1'
          type='expressive-headline'
          color='high-contrast'
          collapse
        >{title}</Text>
        <Text
          tag='p'
          size='body-large'
          type='expressive-body'
          color='high-contrast'
          collapse
        >{description}</Text>
      </Flex>
    </article>
  )
}

export { FeaturedItem }
export type { FeaturedItemProps }