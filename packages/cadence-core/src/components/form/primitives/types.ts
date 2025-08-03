import { ReactNode, HTMLAttributes, LabelHTMLAttributes } from 'react'

export interface HelperTextProps {
  children?: ReactNode
  className?: string
}

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor?: string
  id?: string
  children?: ReactNode
  className?: string
}

export interface ValidationMessageProps extends HTMLAttributes<HTMLSpanElement> {
  children?: string | ReactNode
  type?: 'success' | 'warning' | 'error'
  className?: string
}