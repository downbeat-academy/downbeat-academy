interface FeaturedItemProps {
	children?: React.ReactNode
}

interface FeaturedItemTitleProps {
	children?: React.ReactNode
	className?: string
	background?: string
}

interface FeaturedItemImageProps {
	image?: any
	alt?: string
	url?: string
}

interface FeaturedItemAuthorsProps {}

interface FeaturedItemDescriptionProps {
	children?: React.ReactNode
	background?: string
	className?: string
}

export type {
	FeaturedItemProps,
	FeaturedItemTitleProps,
	FeaturedItemImageProps,
	FeaturedItemAuthorsProps,
	FeaturedItemDescriptionProps,
}
