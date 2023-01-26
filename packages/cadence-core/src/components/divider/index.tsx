import classnames from 'classnames'
import { DividerProps } from './types'
import s from './divider.module.scss'

const Divider = ({ color, width, height, align }: DividerProps) => {
  const classes = classnames(
    s.root,
    s[`width--${width}`],
    s[`color--${color}`]
  )
  return (<hr className={classes} align='left' />)
}

export { Divider }