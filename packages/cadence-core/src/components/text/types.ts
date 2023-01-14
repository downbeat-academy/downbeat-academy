interface TextProps {
	children: React.ReactNode,
	tag:
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6'
	| 'p'
	| 'span'
	| 'caption'
	| 'code'
	| 'cite'
	| 'pre'
	| 'sup'
	| 'sub',
	type?: 'expressive' | 'productive',
	size:
	| '6x-large'
	| '5x-large'
	| '4x-large'
	| '3x-large'
	| '2x-large'
	| 'x-large'
	| 'large'
	| 'base'
	| 'small'
	| 'x-small',
	color?:
	| 'primary'
	| 'interactive'
	| 'brand'
	| 'strong'
	| 'secondary'
	| 'disabled'
	| 'high-contrast'
	| 'success'
	| 'caution'
	| 'critical',
	category?: 'body' | 'headline',
	fluid?: boolean,
	collapse?: boolean,
	align?: 'left' | 'center' | 'right',
}

export type { TextProps }
