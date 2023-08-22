import { ForwardedRef, forwardRef } from 'react'
import classnames from 'classnames'
import s from './button.module.scss'

import type { ButtonProps, ButtonLinkProps } from './types'

// eslint-disable-next-line react/display-name
const Button = forwardRef(
  (
    {
      'aria-controls': ariaControls,
      'aria-describedby': ariaDescribedBy,
      'aria-expanded': ariaExpanded,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      className,
      disabled,
      name,
      href,
      icon,
      iconPosition = 'leading',
      id,
      isFullWidth,
      onClick,
      size = 'medium',
      text,
      type,
      variant = 'primary',
    }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {

    const classes = classnames([
      s[`button--root`],
      s[variant],
      s[size],
      [isFullWidth ? s[`is-full-width`] : null],
      className,
    ])

    const hasText = !!text

    // Todo: Add support for icons
    // const hasIcon = !!icon
    // const hasLeadingIcon = hasIcon && iconPosition === 'leading'
    // const hasTrailingIcon = hasIcon && iconPosition === 'trailing'

    if (!href) {
      return (
        <button
          aria-controls={ariaControls}
          aria-describedby={ariaDescribedBy}
          aria-expanded={ariaExpanded}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          className={classes}
          disabled={disabled}
          id={id}
          name={name}
          onClick={onClick}
          ref={ref}
          type={type}
        >
          {/* {hasLeadingIcon && icon} */}
          {hasText && <span>{text}</span>}
          {/* {hasTrailingIcon && icon} */}
        </button>
      )
    } else if (!!href) {
      return (
        <a
          href={href}
          aria-controls={ariaControls}
          aria-describedby={ariaDescribedBy}
          aria-expanded={ariaExpanded}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          className={classes}
          id={id}
        >
          {text}
        </a>
      )
    }
  }
)

export { Button }
export type { ButtonProps }