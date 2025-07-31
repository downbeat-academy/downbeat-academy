import React, { ForwardedRef, forwardRef, ElementType } from 'react'
import classnames from 'classnames'
import s from './button.module.css'
import type { ButtonProps } from './types'

const Button = forwardRef(
  (
    {
      'aria-controls': ariaControls,
      'aria-describedby': ariaDescribedBy,
      'aria-expanded': ariaExpanded,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      as,
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
      text,
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
      s[`button--root`],
      s[variant],
      s[size],
      isFullWidth && s[`is-full-width`],
      disabled && s[`disabled`],
      className,
    ])

    const hasText = !!text

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
          {hasText && <span>{text}</span>}
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
          {hasText && <span>{text}</span>}
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
        {hasText && <span>{text}</span>}
      </Component>
    )
  }
)

Button.displayName = 'Button'

export { Button }
export type { ButtonProps }