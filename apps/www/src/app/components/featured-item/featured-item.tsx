import { Text } from '@components/text'
import { Avatar, AvatarGroup } from '@components/avatar'
import { Badge } from '@components/badge'
import { Link } from '@components/link'
import { Flex } from '@components/flex'
import s from './featured-item.module.scss'

import type { FeaturedItemProps } from "./types"

const FeaturedItem = ({
  title,
  image,
  authors,
}: FeaturedItemProps) => {
  return (
    <article className={s.root}>
      <Flex direction='column'>
        {title}
        {authors}
      </Flex>
      {image}
    </article>
  )
}

FeaturedItem.displayName = 'FeaturedItem'

const Root = FeaturedItem;

export { FeaturedItem, Root }
export type { FeaturedItemProps }