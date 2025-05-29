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
	const readingTime = `${minutes} minute read`
	const displayText = `${preContent || ''}${readingTime}${postContent || ''}`

	return (
		<Text
			type="expressive-body"
			size="body-base"
			color="primary"
			collapse
			className={className}
		>
			<em>{displayText}</em>
		</Text>
	)
}

export default ReadingLength
