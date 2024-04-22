import type { AvatarProps } from '@components/avatar'

interface AuthorMetadataProps {
	authors?: AvatarProps[]
	avatarSize?: 'small' | 'medium' | 'large'
	children?: React.ReactNode
	className?: string
	date?: string
}

export type { AuthorMetadataProps }
