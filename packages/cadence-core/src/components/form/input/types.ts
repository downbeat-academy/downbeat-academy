import { InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'email' | 'number' | 'tel' | 'url' | 'password'
  name?: string
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  value?: string
  id?: string
  isInvalid?: boolean
  className?: string
  // Specific properties for react-hook-form (optional for framework independence)
  register?: any
  validationSchema?: any
}