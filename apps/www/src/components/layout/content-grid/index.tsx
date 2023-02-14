import classnames from 'classnames'
import s from './contentGrid.module.scss'

const ContentGrid = ({ children }) => {
  
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