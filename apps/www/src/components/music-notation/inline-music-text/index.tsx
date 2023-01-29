import classnames from 'classnames'
import s from './inlineMusicText.module.scss'
import { InlineMusicTextProps } from './types'
import { renderValues } from './renderValues'

const InlineMusicText = ({ values }: InlineMusicTextProps) => {
  
  const classes = classnames(
    s.wrapper,
  )

  return (
    <span className={classes}>{renderValues(values)}</span>
  )
}

export { InlineMusicText }