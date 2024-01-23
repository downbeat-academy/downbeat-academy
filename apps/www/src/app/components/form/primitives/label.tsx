import classnames from 'classnames'

import type { LabelProps } from "../types"

const Label = ({
  children,
  className,
}: LabelProps) => {

  const classes = classnames(
    className,
  )

  return (
    <label
      className={classes}
    >
      {children}
    </label>
  )
}

export { Label }