export interface ContributorAvatar {
	url: string
	id: number
	alt: string
	description: string
	updatedAt: Date
	createdAt: Date
	filename: string
	mimeType: string
	filesize: number
	width: number
	height: number
	focalX: number
	focalY: number
}

export interface ContributorCardProps {
	id: number
	name: string
	slug: string
	avatar: ContributorAvatar | null
	instruments: string[]
}

export interface ContributorsGridProps {
	contributors: ContributorCardProps[]
}
