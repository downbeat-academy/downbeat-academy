interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  name?: string
  rel?: string
  action?: any
  method?: 'POST' | 'GET'
  spacing?: 'none' | 'small' | 'medium' | 'large'
  maxWidth?: string
  onSubmmit?: any
  children?: React.ReactNode
  className?: string
}

export type { FormProps }