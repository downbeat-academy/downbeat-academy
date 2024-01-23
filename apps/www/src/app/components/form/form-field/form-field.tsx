import classnames from 'classnames'

import type { FormFieldProps } from "../types"

const FormField = ({
  children,
  className
}: FormFieldProps) => {

  const classes = classnames(
    className,
  )

  return (
    <div className={classes}>
      {children}
    </div>
  )
}

export { FormField }