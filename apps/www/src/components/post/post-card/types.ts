import { author } from '../../../types/author'

interface PostCardProps {
	image: any
	title: string
	slug: string
	authors: author[]
	date: string,
	excerpt?: string,
}

export type { PostCardProps }
