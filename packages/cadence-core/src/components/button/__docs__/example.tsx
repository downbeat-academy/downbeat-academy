import React, { FC } from 'react'
import { Button, ButtonProps } from '../button'

const Example: FC<ButtonProps> = ({
  text = 'Button',
  variant = 'primary',
  size = 'medium',
}) => {
  return (
    <Button
      text={text}
      variant={variant}
      size={size}
    />
  )
}

export default Example