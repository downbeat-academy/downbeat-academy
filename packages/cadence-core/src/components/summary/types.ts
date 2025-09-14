import type { TextProps } from '../text/types'

interface SummaryTitleConfig {
	text: string
	type?: TextProps['type']
	tag?: TextProps['tag']
	size?: TextProps['size']
	color?: TextProps['color']
}

interface SummaryProps {
	title?: SummaryTitleConfig
	isOpen?: boolean
	type?: 'contained' | 'flush'
	size?: 'small' | 'medium' | 'large'
	maxWidth?: string
	children?: React.ReactNode
	className?: string
}

export type { SummaryProps, SummaryTitleConfig }