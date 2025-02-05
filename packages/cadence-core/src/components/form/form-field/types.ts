interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'vertical' | 'horizontal'
  children?: React.ReactNode
  className?: string
}

export type { FormFieldProps }