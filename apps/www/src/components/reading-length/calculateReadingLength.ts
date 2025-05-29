export type BlockContent = {
	_type: string
	children?: Array<{
		text: string
	}>
	child?: {
		text: string
	}
	text?: string
}

type ContentInput = BlockContent[] | string | null | undefined
type ReadingTimeMinutes = number

const calculateReadingLength = (content: ContentInput): ReadingTimeMinutes => {
	if (!content) {
		return 1 // Default to 1 minute for empty/invalid content
	}

	// Handle string content directly
	if (typeof content === 'string') {
		const words = content.trim().split(/\s+/).length
		const readingTime = Math.ceil(words / 200)
		return Math.max(1, readingTime)
	}

	// Handle CMS block content
	if (!Array.isArray(content)) {
		return 1
	}

	// Filter for block content and extract text
	const textContent = content
		.filter((block) => block._type === 'block')
		.reduce((acc, block) => {
			// Handle different possible text locations in the block
			if (block.children) {
				return acc + block.children.map((child) => child.text).join(' ')
			}
			if (block.child) {
				return acc + block.child.text
			}
			if (block.text) {
				return acc + block.text
			}
			return acc
		}, '')

	// Calculate word count and reading time
	const words = textContent.trim().split(/\s+/).length
	const readingTime = Math.ceil(words / 200)

	// Ensure minimum reading time of 1 minute
	return Math.max(1, readingTime)
}

export default calculateReadingLength
