import classnames from 'classnames'
import { AppWrapperProps } from './types'
import s from './appWrapper.module.scss'

const AppWrapper = ({ children }: AppWrapperProps ) => {

  const classes = classnames(
    s.root,
  )

  return (
    <div className={classes}>
      {children}
    </div>
  )
}

export { AppWrapper }