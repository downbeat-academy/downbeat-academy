import { ReactNode, FormHTMLAttributes } from 'react'

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  name?: string
  rel?: string
  action?: any
  method?: 'POST' | 'GET'
  spacing?: 'none' | 'small' | 'medium' | 'large'
  maxWidth?: string
  onSubmit?: any
  children?: ReactNode
  className?: string
}