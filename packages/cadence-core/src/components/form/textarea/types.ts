interface TextareaProps {
  name?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  value?: string
  id?: string
  rows?: number
  className?: string
  // Specific properties for react-hook-form
  register?: any
  validationSchema?: any
}

export type { TextareaProps }