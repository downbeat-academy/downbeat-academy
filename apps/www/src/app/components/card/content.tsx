import classnames from 'classnames'
import { Flex } from '@components/flex'
import s from './content.module.scss'

import type { CardContentProps } from './types'

const CardContent = ({
  children,
  background = 'primary',
  className,
}: CardContentProps) => {

  const classes = classnames(
    s.root,
    className,
  )

  return (
    <Flex
      // @ts-ignore
      background={background}
      direction='column'
      gap='medium'
      padding='x-large'
      className={classes}
    >
      {children}    
    </Flex>
  )
}

CardContent.displayName = 'CardContent';

const Content = CardContent;

export { CardContent, Content }
export type { CardContentProps }