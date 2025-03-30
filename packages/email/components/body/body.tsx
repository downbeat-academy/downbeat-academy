import React from 'react'
import { Body as ReactEmailBody } from '@react-email/components'
import { getBodyStyles } from './styles'

export interface BodyProps {
  children: React.ReactNode
  style?: React.CSSProperties
}

export const Body = ({
  children,
  style,
}: BodyProps) => {
  return (
    <ReactEmailBody
      style={{
        ...getBodyStyles(),
        ...style,
      }}
    >
      {children}
    </ReactEmailBody>
  )
} 