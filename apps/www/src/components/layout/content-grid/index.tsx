import classnames from 'classnames'
import s from './contentGrid.module.scss'
import { ContentGridProps } from './types'

const ContentGrid = ({ children }: ContentGridProps) => {
  const classes = classnames(
    s.root,
  )

  return (
    <div className={classes}>
      {children}
    </div>
  )
}

export { ContentGrid }