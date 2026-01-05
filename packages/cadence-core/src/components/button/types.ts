import type { ElementType, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive'
export type ButtonSize = 'x-small' | 'small' | 'medium' | 'large'

export interface ButtonProps {
  // Button specific props
  /**
   * The content to display inside the button.
   * Can be empty for icon-only buttons.
   */
  children?: ReactNode
  className?: string
  /**
   * Icon element to display in the button.
   * Icons from cadence-icons are recommended.
   * The icon will be sized automatically based on the button size:
   * - x-small: 12px
   * - small: 14px
   * - medium: 16px
   * - large: 20px
   * Icons inherit color from button text via currentColor.
   */
  icon?: ReactNode
  /**
   * Position of the icon relative to the button text.
   * @default 'leading'
   */
  iconPosition?: 'leading' | 'trailing'
  isFullWidth?: boolean
  size?: ButtonSize
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