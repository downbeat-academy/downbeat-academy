import classnames from 'classnames'

import type { TextareaProps } from "../types";

const Textarea = ({
  className,
}: TextareaProps) => {

  const classes = classnames(
    className,
  )

  return (
    <textarea
      className={classes}
    />
  )
}

export { Textarea }