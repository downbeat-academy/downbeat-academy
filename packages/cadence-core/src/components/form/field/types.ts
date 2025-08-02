import { ReactNode, HTMLAttributes } from 'react'

export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'vertical' | 'horizontal'
  children?: ReactNode
  className?: string
}