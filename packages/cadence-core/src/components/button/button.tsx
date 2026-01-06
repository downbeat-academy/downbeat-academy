import React, {
  ForwardedRef,
  forwardRef,
  ElementType,
  isValidElement,
  cloneElement,
  ReactElement,
} from 'react'
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

const iconSizes: Record<ButtonSize, number> = {
  'x-small': 12,
  small: 14,
  medium: 16,
  large: 20,
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
    const hasChildren = !!children
    const hasIcon = !!icon
    const isIconOnly = hasIcon && !hasChildren

    const classes = classnames([
      s.root,
      variantStyles[variant],
      sizeStyles[size],
      isFullWidth && s.fullWidth,
      disabled && s.isDisabled,
      isIconOnly && s.iconOnly,
      className,
    ])

    // Render icon with proper sizing and accessibility
    const renderIcon = () => {
      if (!icon) return null

      const iconSize = iconSizes[size]
      const iconElement = isValidElement(icon)
        ? cloneElement(icon as ReactElement<{ width?: number; height?: number; 'aria-hidden'?: boolean }>, {
            width: iconSize,
            height: iconSize,
            'aria-hidden': true,
          })
        : icon

      return (
        <span className={s.iconContainer} aria-hidden="true">
          {iconElement}
        </span>
      )
    }

    // Render button content with icon positioning
    const renderContent = () => {
      const iconElement = renderIcon()

      if (isIconOnly) {
        return iconElement
      }

      return (
        <>
          {iconPosition === 'leading' && iconElement}
          {hasChildren && <span className={s.label}>{children}</span>}
          {iconPosition === 'trailing' && iconElement}
        </>
      )
    }

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
          {renderContent()}
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
          {renderContent()}
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
        {renderContent()}
      </Component>
    )
  }
)

Button.displayName = 'Button'

export { Button }
export type { ButtonProps }