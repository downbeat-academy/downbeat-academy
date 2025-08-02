import { ReactNode } from 'react'

export interface HorizontalWrapperProps {
  gap?: 'none' | 'small' | 'medium' | 'large'
  className?: string
  children?: ReactNode
}