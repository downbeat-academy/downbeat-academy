import classnames from 'classnames'
import { ContentGridItemProps } from "./types"
import s from './contentGridItem.module.scss'

const ContentGridItem = ({ children, location }: ContentGridItemProps) => {

  const classes = classnames(
    s.root,
    s[`location--${location}`]
  )

  return (
    <div className={classes}>{children}</div>
  )
}

export { ContentGridItem }