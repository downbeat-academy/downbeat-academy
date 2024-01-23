import classnames from 'classnames'

import type { ValidationMessageProps } from "../types"

const ValidationMessage = ({
  children,
  className,
}: ValidationMessageProps) => {

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

export { ValidationMessage }