import classnames from 'classnames'
import { Flex } from 'cadence-core'
import { Text } from 'cadence-core'
import { Link } from '@components/link'
import s from './blockquote.module.css'

import type { BlockquoteProps } from './types'

const Blockquote = ({
	quote,
	attribution,
	link,
	collapse,
	className,
}: BlockquoteProps) => {
	const classes = classnames([s.root, { [s.collapse]: collapse }, className])

	const renderAttribution = () => {
		if (link !== undefined) {
			return (
				<Text
					tag="p"
					type="expressive-body"
					size="body-small"
					collapse
					dataCy="cds-blockquote-attribution"
				>
					<Link href={link} type="secondary">
						– {attribution}
					</Link>
				</Text>
			)
		} else {
			return (
				<Text
					tag="p"
					type="expressive-body"
					size="body-small"
					collapse
					dataCy="cds-blockquote-attribution"
				>
					– {attribution}
				</Text>
			)
		}
	}

	return (
		<Flex
			tag="div"
			direction="column"
			gap="large"
			className={classes}
			data-cy="cds-blockquote"
		>
			{quote && (
				<Text
					tag="blockquote"
					type="expressive-body"
					size="body-large"
					collapse
				>
					<em data-cy="cds-blockquote-quote">{quote}</em>
				</Text>
			)}
			{renderAttribution()}
		</Flex>
	)
}

export { Blockquote }
export type { BlockquoteProps }
