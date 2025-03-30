import React from 'react'
import { Heading as ReactEmailHeading } from '@react-email/components'
import { getHeadingStyles, type HeadingLevel } from './styles'
import type { TextColor } from '../text/styles'

export interface HeadingProps {
  children: React.ReactNode
  level?: HeadingLevel
  color?: TextColor
  style?: React.CSSProperties
}

export const Heading = ({
  children,
  level = 'h1',
  color = 'primary',
  style,
}: HeadingProps) => {
  return (
    <ReactEmailHeading
      as={level}
      style={{
        ...getHeadingStyles(level, color),
        ...style,
      }}
    >
      {children}
    </ReactEmailHeading>
  )
} 