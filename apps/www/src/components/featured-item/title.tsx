import classnames from 'classnames'
import { Flex } from '@components/flex'
import s from './title.module.scss'

import type { FeaturedItemTitleProps } from './types'

const FeaturedItemTitle = ({
  children,
  background = 'brand',
  className
}: FeaturedItemTitleProps) => {

  const classes = classnames(
    s.root,
    className,
  )

  return (
    <Flex
      // @ts-ignore
      background={background}
      gap='x-large'
      className={classes}
    >
      {children}
    </Flex>
  )
}

FeaturedItemTitle.displayName = 'FeaturedItemTitle'

const Title = FeaturedItemTitle;

export { FeaturedItemTitle, Title }
export type { FeaturedItemTitleProps }