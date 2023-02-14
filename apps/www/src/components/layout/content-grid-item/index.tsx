import classnames from 'classnames'
import { ContentGridItemProps } from './types'
import s from './contentGridItem.module.scss'

const ContentGridItem = ({
  children,
  location,
  padding = 'small',
  gap
}:ContentGridItemProps) => {
  const classes = classnames(
    s[`location--${location}`],
    s[`padding--${padding}`],
    s[`gap--${gap}`]
  )

  if (location === 'sidebar-left' || location === 'sidebar-right') {
    return (
      <aside className={classes}>{children}</aside>
    )
  } else if (location === 'center' || location === 'full-bleed') {
    return (
      <section className={classes}>{children}</section>
    )
  } else {
    return (
      <section className={classes}>{children}</section>
    )
  }
}

export { ContentGridItem }