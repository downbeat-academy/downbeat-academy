import classnames from 'classnames'
import s from './contentGrid.module.scss'
import { ContentGridProps } from './types'

const ContentGrid = ({
  children,
  location,
  padding,
}: ContentGridProps) => {
  const classes = classnames(
    s.root,
    s[`location--${location}`],
    s[`padding--${padding}`]
  )

  return (
    <div className={classes}>
      {children}
    </div>
  )
}

export { ContentGrid }