import React, { FC } from 'react'
import { Textarea } from '../textarea'
import { TextareaProps } from '../types'

const Example: FC<TextareaProps> = ({
  name,
  placeholder,
  disabled,
  readonly,
  value,
  id,
  rows,
  required,
  register,
}) => {
  return (
    <Textarea
      name={name}
      placeholder={placeholder}
      disabled={disabled}
      readonly={readonly}
      value={value}
      id={id}
      rows={rows}
    />
  )
}

export default Example;