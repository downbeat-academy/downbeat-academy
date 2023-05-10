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
	icon?: JSX.IntrinsicElements['svg']
	iconPosition?: 'leading' | 'trailing'
	isFullWidth?: boolean
	size?: 'large' | 'default' | 'small' | 'x-small'
	text?: string
	variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'destructive'
}

export type { ButtonProps }
