import classnames from 'classnames'
import s from './innerWrapper.module.scss'
import { InnerWrapperProps } from './types'

const InnerWrapper = ({ location, children }: InnerWrapperProps) => {

  const classes = classnames(
    s.root,
    s[`location--${location}`]
  )

  return (
    <section className={classes}>{children}</section>
  )
}

export { InnerWrapper }