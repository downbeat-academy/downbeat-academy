import React, { PropsWithChildren } from 'react'
import { Body as ReactEmailBody } from '@react-email/components'
import { getBodyStyles } from './styles'

export interface BodyProps {
  style?: React.CSSProperties
}

export const Body = ({
  children,
  style,
}: PropsWithChildren<BodyProps>) => {
  return (
    <>
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