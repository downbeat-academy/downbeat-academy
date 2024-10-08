import { LinkProps as NextLinkProps } from 'next/link'

interface LinkProps extends Omit<NextLinkProps, 'href'> {
	opensInNewTab?: boolean
	type?: 'primary' | 'secondary' | 'brand' | 'inherit'
	className?: string
	dataCy?: string
	isUnderline?: boolean
	children?: React.ReactNode
	href?: any,
	target?: string
	ariaDescribedBy?: string
}

export type { LinkProps }
