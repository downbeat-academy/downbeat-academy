import { ReactNode, HTMLAttributes } from 'react'

export interface FieldProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'vertical' | 'horizontal'
  children?: ReactNode
  className?: string
}