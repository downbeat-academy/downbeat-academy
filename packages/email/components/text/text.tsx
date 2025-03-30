import React from 'react'
import { Text as ReactEmailText } from '@react-email/components'
import { getTextStyles, type TextColor, type TextSize, type TextWeight } from './styles'

export interface TextProps {
  children: React.ReactNode
  size?: TextSize
  weight?: TextWeight
  color?: TextColor
  style?: React.CSSProperties
}

export const Text = ({
  children,
  size = 'base',
  weight = 'normal',
  color = 'primary',
  style,
}: TextProps) => {
  return (
    <ReactEmailText
      style={{
        ...getTextStyles(size, weight, color),
        ...style,
      }}
    >
      {children}
    </ReactEmailText>
  )
} 