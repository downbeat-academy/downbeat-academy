import classnames from 'classnames'

import type { HelperTextProps } from "../types"

const HelperText = ({
  children,
  className,
}: HelperTextProps) => {

  const classes = classnames(
    className,
  )

  return (
    <span
      className={classes}
    >
      {children}
    </span>
  )
}

export { HelperText }