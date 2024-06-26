import type { ComponentProps } from 'react'
import NextLink from 'next/link'

type NativeButtonProps = JSX.IntrinsicElements['button']

type PickedNativeButtonProps = Pick<
	NativeButtonProps,
	| 'aria-controls'
	| 'aria-describedby'
	| 'aria-expanded'
	| 'aria-label'
	| 'aria-labelledby'
	| 'className'
	| 'disabled'
	| 'form'
	| 'id'
	| 'name'
	| 'onClick'
	| 'type'
>

interface ButtonProps extends PickedNativeButtonProps {
	className?: string
	href?: string
	icon?: JSX.IntrinsicElements['svg']
	iconPosition?: 'leading' | 'trailing'
	isFullWidth?: boolean
	isLinkInternal?: boolean
	size?: 'large' | 'medium' | 'small' | 'x-small'
	text?: string
	variant?: 'primary' | 'secondary' | 'ghost' | 'destructive'
	formAction?: any
}

// Button as link
type InheritedButtonProps = Pick<
	ButtonProps,
	'icon' | 'iconPosition' | 'size' | 'text' | 'variant'
>

interface ButtonLinkProps extends InheritedButtonProps {
	openInNewTab?: boolean
}

interface ButtonWrapperProps {
	direction?: 'vertical' | 'horizontal'
	gap?: 'none' | 'small' | 'medium' | 'large'
	wrap?: boolean
	className?: string
	children: React.ReactNode
}

export type { ButtonProps, ButtonLinkProps, ButtonWrapperProps }
