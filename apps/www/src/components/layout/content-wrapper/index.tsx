import classnames from 'classnames'
import s from './contentWrapper.module.scss'
import { ContentWrapperProps } from './types'

const ContentWrapper = ({
  children,
  padding,
}: ContentWrapperProps) => {
  const classes = classnames(
    s.root,
    s[`padding--${padding}`]
  )

  return (
    <main className={classes}>
      {children}
    </main>
  )
}

export { ContentWrapper }