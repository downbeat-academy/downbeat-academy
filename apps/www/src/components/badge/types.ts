import { ReactElement } from 'react'

interface BadgeProps {
	type?: 'neutral' | 'info' | 'success' | 'highlight' | 'warning' | 'error'
	size?: 'small' | 'medium' | 'large'
	style?: 'filled' | 'outlined' | 'light'
	text?: string
	icon?: ReactElement
	className?: string
}

export type { BadgeProps }
