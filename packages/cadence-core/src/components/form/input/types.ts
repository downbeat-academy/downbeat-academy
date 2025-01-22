interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'email' | 'number' | 'tel' | 'url' | 'password'
  name?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  value?: string
  id?: string
  isInvalid?: boolean
  className?: string
  // Specific properties for react-hook-form
  register?: any
  validationSchema?: any
}

export type { InputProps }