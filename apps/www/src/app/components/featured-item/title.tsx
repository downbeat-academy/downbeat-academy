import classnames from 'classnames'
import { Flex } from '@components/flex'
import s from './title.module.scss'

import type { FeaturedItemTitleProps } from './types'

const FeaturedItemTitle = ({
  title,
  description,
  background = 'brand',
  className
}: FeaturedItemTitleProps) => {

  const classes = classnames(
    s.root,
  )

  return (
    // @ts-ignore
    <Flex background={background} className={classes}>
      {title}
      {description}
    </Flex>
  )
}

FeaturedItemTitle.displayName = 'FeaturedItemTitle'

const Title = FeaturedItemTitle;

export { FeaturedItemTitle, Title }
export type { FeaturedItemTitleProps }