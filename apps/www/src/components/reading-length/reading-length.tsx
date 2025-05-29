import { Text } from 'cadence-core'
import calculateReadingLength from './calculateReadingLength'
import type { BlockContent } from './calculateReadingLength'

type ReadingLengthProps = {
	content: BlockContent[] | string | null | undefined
	className?: string
	preContent?: string
	postContent?: string
}

export const ReadingLength = ({
	content,
	preContent,
	postContent,
	className,
}: ReadingLengthProps) => {
	const minutes = calculateReadingLength(content)
	const readingTime = `${minutes} min read`
	const displayText = `${preContent || ''}${readingTime}${postContent || ''}`

	return (
		<Text
			type="expressive-body"
			size="body-base"
			color="primary"
			className={className}
		>
			{displayText}
		</Text>
	)
}

export default ReadingLength
