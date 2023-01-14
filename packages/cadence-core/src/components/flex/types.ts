interface FlexProps {
	as?: React.ElementType
	children: React.ReactNode
	direction?: 'row' | 'column'
	gap?: 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | '2x-large' | '3x-large' | '4x-large' | '5x-large,'
	padding?: 'x-small' | 'small' | 'medium' | 'large' | 'x-large'
	background?:
	| 'primary'
	| 'secondary'
	| 'brand'
	| 'interactive'
	| 'positive'
	| 'caution'
	| 'critical'
	| 'info'
	| 'dark'
	borderRadius?: 'default' | 'soft' | 'medium' | 'hard' | 'rounded'
	borderColor?:
	| 'default'
	| 'caution'
	| 'critical'
	| 'positive'
	| 'info'
	| 'interactive'
	justify?:
	| 'start'
	| 'end'
	| 'center'
	| 'space-between'
	| 'space-around'
	| 'space-evenly'
	align?: 'start' | 'end' | 'center' | 'stretch' | 'baseline'
	textAlign?: 'left' | 'right' | 'center'
	wrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
}

export type { FlexProps }
