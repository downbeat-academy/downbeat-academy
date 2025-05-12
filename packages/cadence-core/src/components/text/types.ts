import { ElementType, HTMLAttributes } from 'react'

interface TextProps extends Omit<HTMLAttributes<HTMLOrSVGElement>, 'children'> {
	children: React.ReactNode
	type?:
	| 'productive-body'
	| 'productive-headline'
	| 'expressive-body'
	| 'expressive-headline'
	tag?: ElementType
	size?:
	| 'mega'
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6'
	| 'body-large'
	| 'body-base'
	| 'body-small'
	| 'body-x-small'
	isFluid?: boolean
	color?:
	| 'primary'
	| 'strong'
	| 'faint'
	| 'disabled'
	| 'high-contrast'
	| 'warning'
	| 'critical'
	| 'interactive'
	| 'brand'
	| 'success'
	background?:
	| 'primary'
	| 'faint'
	| 'high-contrast'
	| 'brand'
	| 'interactive'
	| 'success'
	| 'warning'
	| 'critical'
	align?: 'left' | 'center' | 'right' | 'justify'
	collapse?: boolean
	dataCy?: string
	className?: string
	id?: string,
}

interface ListProps extends Omit<HTMLAttributes<HTMLOrSVGElement>, 'children'> {
	children: React.ReactNode
	type?: 'ordered' | 'unordered'
	collapse?: boolean
	className?: string
}

export type { TextProps, ListProps }
