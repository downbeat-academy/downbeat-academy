import classnames from 'classnames'
import s from './list-item.module.scss'
import { Link } from '@components/link'
import { Text } from '@components/text'

import type { ListItemProps } from './types'

const ListItem = ({
  title,
  description,
  url,
  className,
}: ListItemProps) => {

  const classes = classnames(
    s.root,
    className,
  )

  return (
    <article className={classes}>
      <Text
        tag='h3'
        size='h5'
        type='expressive-headline'
        color='primary'
        collapse
      >
        <Link href={url} type='inherit'>{title}</Link>
      </Text>
      {description &&
        <Text
          tag='p'
          size='body-base'
          type='expressive-body'
          collapse
        >{description}</Text>
      }
    </article>
  )
}

export { ListItem }
export type { ListItemProps }