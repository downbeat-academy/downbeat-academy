import classnames from 'classnames'
import { DividerProps } from './types'
import s from './divider.module.scss'

const Divider = ({
  color = 'primary',
  width = 'small',
  thickness = 'small',
  align = 'left'
}: DividerProps) => {
  const classes = classnames(
    s.root,
    s[`width--${width}_thickness--${thickness}`],
    s[`color--${color}`],
    s[`align--${align}`]
  )
  return (
    <hr
      className={classes} 
      // @ts-ignore
      align={align}
    />
  )
}

export { Divider }