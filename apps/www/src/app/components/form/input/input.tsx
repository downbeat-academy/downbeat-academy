import classnames from 'classnames'

import type { InputProps } from "../types";

const Input = ({
  className,
}: InputProps) => {

  const classes = classnames(
    className,
  )

  return (
    <input
      className={classes}
    />
  )
}

export { Input }