interface Author {
	name: string
	slug?: string
	image?: any // Can be various structures from Sanity
}

interface AuthorMetadataProps {
	authors?: Author[]
	avatarSize?: 'small' | 'medium' | 'large'
	children?: React.ReactNode
	className?: string
	date?: string
}

export type { AuthorMetadataProps }
