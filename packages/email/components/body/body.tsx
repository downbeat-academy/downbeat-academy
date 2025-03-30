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
    <>
      <style>
        {`
          @media only screen and (max-width: 600px) {
            .responsive-body {
              padding: 12px !important;
            }
          }
        `}
      </style>
      <ReactEmailBody
        style={{
          ...getBodyStyles(),
          ...style,
        }}
        className="responsive-body"
      >
        {children}
      </ReactEmailBody>
    </>
  )
} 