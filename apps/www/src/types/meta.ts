interface MetaProps {
	params: Promise<{
		title?: string
		description?: string
		slug?: string
	}>
}

export type { MetaProps }
