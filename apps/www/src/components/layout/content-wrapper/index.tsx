import classnames from 'classnames'
import { ContentWrapperProps } from './types'
import s from './contentWrapper.module.scss'

const ContentWrapper = ({ children }: ContentWrapperProps) => {
  const classes = classnames(
    s.root,
  )

  return (
    <main className={classes}>
      {children}
    </main>
  )
}

export { ContentWrapper }