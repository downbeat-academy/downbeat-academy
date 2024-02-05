import classnames from 'classnames'
import s from './label.module.scss'

import type { LabelProps } from "../types"

const Label = ({
  htmlFor,
  id,
  children,
  className,
}: LabelProps) => {

  const classes = classnames(
    s['cds-label--root'],
    className,
  )

  return (
    <label
      htmlFor={htmlFor}
      id={id}
      className={classes}
    >
      {children}
    </label>
  )
}

export { Label }