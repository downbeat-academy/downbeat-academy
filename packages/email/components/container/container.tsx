import React from 'react'
import { Container as ReactEmailContainer } from '@react-email/components'
import { getContainerStyles, type ContainerBackground, type ContainerBorderColor, type ContainerPadding } from './styles'

export interface ContainerProps {
  children: React.ReactNode
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
}: ContainerProps) => {
  return (
    <>
      <style>
        {`
          @media only screen and (max-width: 600px) {
            .responsive-container {
              padding: var(--mobile-padding) !important;
            }
            .responsive-container.padding-none {
              padding: 0 !important;
            }
            .responsive-container.padding-small {
              --mobile-padding: 12px;
            }
            .responsive-container.padding-medium {
              --mobile-padding: 14px;
            }
            .responsive-container.padding-large {
              --mobile-padding: 16px;
            }
          }
        `}
      </style>
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