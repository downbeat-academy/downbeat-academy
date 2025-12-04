import React, { PropsWithChildren } from 'react'
import { Button as ReactEmailButton } from '@react-email/components'
import { getButtonStyles, type ButtonType, type ButtonSize } from './styles'

export interface ButtonProps {
  href: string,
  type?: ButtonType,
  size?: ButtonSize,
}

export const Button = ({
  children,
  href,
  type = 'primary',
  size = 'medium',
}: PropsWithChildren<ButtonProps>) => {
  return (
    <ReactEmailButton 
      href={href}
      style={getButtonStyles(type, size)}
    >
      {children}
    </ReactEmailButton>
  )
}



