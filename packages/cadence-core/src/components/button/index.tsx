import { ForwardedRef, forwardRef } from 'react';
import classnames from 'classnames';
import { ButtonProps } from './types';
import s from './button.module.css';

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
			form,
			icon,
			iconPosition,
			id,
			isFullWidth = false,
			name,
			onClick,
			size = 'default',
			text,
			type,
			variant = 'primary',
		}: ButtonProps,
		ref: ForwardedRef<HTMLButtonElement>
	) => {
		const classes = classnames(
			s.root,
			s[variant],
			s[size],
			{ [s.fullWidth]: isFullWidth },
			className
		);

		const hasIcon = !!icon;
		const hasText = !!text;
		const hasLeadingIcon = hasIcon && iconPosition === 'leading';
		const hasTrailingIcon = hasIcon && iconPosition === 'trailing';

		return (
			<button
				aria-controls={ariaControls}
				aria-describedby={ariaDescribedBy}
				aria-expanded={ariaExpanded}
				aria-label={ariaLabel}
				aria-labelledby={ariaLabelledBy}
				className={classes}
				disabled={disabled}
				form={form}
				id={id}
				name={name}
				onClick={onClick}
				ref={ref}
				role="button"
				type={type}
			>
				<>
					{hasLeadingIcon && icon}
					{hasText && text}
					{hasTrailingIcon && icon}
				</>
			</button>
		);
	}
);

export type { ButtonProps };
export { Button };
