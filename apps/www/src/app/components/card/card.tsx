import classnames from 'classnames'
import s from './card.module.scss'

import type { CardProps } from './types'

const Card = ({
  children,
  tag,
  borderColor,
  className,
}: CardProps) => {

  const classes = classnames(
    s.root,
    s[`border-color--${borderColor}`],
    className,
  )

  const Tag = tag;

  return (
    <Tag className={classes}>
      {children}
    </Tag>
  )
}

Card.displayName = 'Card';

const Root = Card;

export { Card, Root }
export type { CardProps }