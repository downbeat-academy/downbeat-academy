import classnames from 'classnames'
import { ListProps, ListItemProps } from './types'
import s from './list.module.scss'

const List = ({
  listType,
  context,
  children,
}: ListProps) => {

  const classes = classnames(
    s.root,
    s[`context--${context}`],
  )

  switch (listType) {
    case 'ol': return <ol className={classes}>{children}</ol>
    case 'ul': return <ul className={classes}>{children}</ul>
    default: return <ul className={classes}>{children}</ul>
  }
}

export { List }
export type { ListProps, ListItemProps }