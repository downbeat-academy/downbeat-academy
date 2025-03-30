import React from 'react'
import { Button as ReactEmailButton } from '@react-email/components'
import { getButtonStyles, type ButtonType, type ButtonSize } from './styles'

export interface ButtonProps {
  href: string,
  type?: ButtonType,
  size?: ButtonSize,
  children: React.ReactNode,
}

export const Button = ({
  children,
  href,
  type = 'primary',
  size = 'medium',
}: ButtonProps) => {
  return (
    <ReactEmailButton 
      href={href}
      style={getButtonStyles(type, size)}
    >
      {children}
    </ReactEmailButton>
  )
}



