import { TextareaHTMLAttributes } from 'react'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name?: string
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  value?: string
  id?: string
  rows?: number
  className?: string
  // Specific properties for react-hook-form (optional for framework independence)
  register?: any
  validationSchema?: any
}