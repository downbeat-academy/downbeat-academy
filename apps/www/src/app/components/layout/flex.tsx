import classnames from 'classnames'
import s from './flex.module.scss'

import type { FlexProps } from './types'

const Flex = ({
  children,
  tag = 'div',
  gap = 'none',
  padding = 'none',
  direction = 'column',
  className,
  alignItems,
  alignContent,
  justifyItems,
  justifyContent,
}: FlexProps) => {

  const classes = classnames([
    s.root,
    s[`gap--${gap}`],
    s[`padding--${padding}`],
    s[direction],
    s[`align-items--${alignItems}`],
    s[`align-content--${alignContent}`],
    s[`justify-items--${justifyItems}`],
    s[`justify--${justifyContent}`],
    className,
  ])

  const Tag = tag;

  return (
    <Tag className={classes}>{children}</Tag>
  )
}

export { Flex }
export type { FlexProps }