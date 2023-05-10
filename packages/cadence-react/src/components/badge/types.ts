interface BadgeProps {
	text: string
	type?: 'neutral' | 'informational' | 'positive' | 'warning' | 'critical'
	style?: 'fill' | 'outline' | 'inverse'
	size?: 'small' | 'default' | 'large'
	icon?: JSX.IntrinsicElements['svg']
	iconPosition?: 'leading' | 'trailing'
	className?: any
}

export type { BadgeProps }
