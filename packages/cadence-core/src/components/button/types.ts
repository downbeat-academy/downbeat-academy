import type { ElementType, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive'
export type ButtonSize = 'x-small' | 'small' | 'medium' | 'large'

export interface ButtonProps {
  // Button specific props
  className?: string
  icon?: ReactNode
  iconPosition?: 'leading' | 'trailing'
  isFullWidth?: boolean
  size?: ButtonSize
  text?: string
  variant?: ButtonVariant
  linkComponent?: ElementType
  as?: ElementType

  // Common HTML attributes that work for both button and anchor
  'aria-controls'?: string
  'aria-describedby'?: string
  'aria-expanded'?: boolean
  'aria-label'?: string
  'aria-labelledby'?: string
  id?: string
  onClick?: (event: React.MouseEvent) => void

  // Button-specific attributes
  disabled?: boolean
  name?: string
  type?: 'button' | 'submit' | 'reset'
  formAction?: string

  // Anchor-specific attributes
  href?: string
  target?: string
  rel?: string
}

export interface ButtonWrapperProps {
  direction?: 'vertical' | 'horizontal'
  gap?: 'none' | 'small' | 'medium' | 'large'
  wrap?: boolean
  className?: string
  children: ReactNode
}