interface HelperTextProps {
  children?: React.ReactNode
  className?: string
}

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor?: string
  id?: string
  children?: React.ReactNode
  className?: string
}

interface ValidationMessageProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: string | React.ReactNode
  type?: 'success' | 'warning' | 'error'
  className?: string
}

export type {
  HelperTextProps,
  LabelProps,
  ValidationMessageProps,
}