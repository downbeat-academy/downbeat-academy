import React, { ForwardedRef, forwardRef, ElementType } from 'react'
import classnames from 'classnames'
import s from './button.module.css'
import type { ButtonProps, ButtonVariant, ButtonSize } from './types'

const variantStyles: Record<ButtonVariant, string> = {
  primary: s.primary,
  secondary: s.secondary,
  ghost: s.ghost,
  destructive: s.destructive,
}

const sizeStyles: Record<ButtonSize, string> = {
  'x-small': s.sizeXSmall,
  small: s.sizeSmall,
  medium: s.sizeMedium,
  large: s.sizeLarge,
}

const Button = forwardRef(
  (
    {
      'aria-controls': ariaControls,
      'aria-describedby': ariaDescribedBy,
      'aria-expanded': ariaExpanded,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      as,
      children,
      className,
      disabled,
      href,
      icon,
      iconPosition = 'leading',
      id,
      isFullWidth,
      linkComponent,
      name,
      onClick,
      size = 'medium',
      type = 'button',
      variant = 'primary',
      formAction,
      target,
      rel,
      ...restProps
    }: ButtonProps,
    ref: ForwardedRef<any>
  ) => {
    const classes = classnames([
      s.root,
      variantStyles[variant],
      sizeStyles[size],
      isFullWidth && s.fullWidth,
      disabled && s.isDisabled,
      className,
    ])

    const hasChildren = !!children

    // Common props for all button types
    const commonProps = {
      'aria-controls': ariaControls,
      'aria-describedby': ariaDescribedBy,
      'aria-expanded': ariaExpanded,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      className: classes,
      id,
      'data-cy': 'cds-button',
      ref,
    }

    // If href is provided and we have a custom link component
    if (href && linkComponent) {
      const LinkComponent = linkComponent
      return (
        <LinkComponent
          {...commonProps}
          {...restProps}
          href={href}
        >
          {hasChildren && <span>{children}</span>}
        </LinkComponent>
      )
    }

    // If href but no custom link component, use standard anchor
    if (href && !linkComponent) {
      return (
        <a
          {...commonProps}
          href={href}
          target={target}
          rel={rel}
        >
          {hasChildren && <span>{children}</span>}
        </a>
      )
    }

    // Default button behavior
    const Component = as || 'button'
    return (
      <Component
        {...commonProps}
        {...restProps}
        disabled={disabled}
        name={name}
        onClick={onClick}
        type={type}
        formAction={formAction}
      >
        {hasChildren && <span>{children}</span>}
      </Component>
    )
  }
)

Button.displayName = 'Button'

export { Button }
export type { ButtonProps }