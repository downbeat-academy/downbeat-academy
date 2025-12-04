import React, { PropsWithChildren } from 'react'
import { Container as ReactEmailContainer } from '@react-email/components'
import { getContainerStyles, type ContainerBackground, type ContainerBorderColor, type ContainerPadding } from './styles'

export interface ContainerProps {
  background?: ContainerBackground
  borderColor?: ContainerBorderColor
  padding?: ContainerPadding
  style?: React.CSSProperties
}

export const Container = ({
  children,
  background = 'primary',
  borderColor = 'primary',
  padding = 'medium',
  style,
}: PropsWithChildren<ContainerProps>) => {
  return (
    <>
      <ReactEmailContainer
        style={{
          ...getContainerStyles(background, borderColor, padding),
          ...style,
        }}
        className={`responsive-container padding-${padding}`}
      >
        {children}
      </ReactEmailContainer>
    </>
  )
} 