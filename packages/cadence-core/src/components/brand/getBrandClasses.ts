import classnames from 'classnames'
import s from './logo.module.css'

export const getBrandClasses = (color: string , className: string | undefined) => {
  return classnames(
    s[color],
    className
  )
}