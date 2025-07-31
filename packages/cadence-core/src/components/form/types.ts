import { ReactNode, FormHTMLAttributes, HTMLAttributes, LabelHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

// Primitives
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

// Form
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

// Form Field
export interface FormFieldProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'vertical' | 'horizontal'
  children?: ReactNode
  className?: string
}

// Input
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

// Textarea
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

// Switch
export interface SwitchProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  name?: string
  id?: string
  disabled?: boolean
  className?: string
}

// Layout Helpers
export interface HorizontalWrapperProps {
  gap?: 'none' | 'small' | 'medium' | 'large'
  className?: string
  children?: ReactNode
}