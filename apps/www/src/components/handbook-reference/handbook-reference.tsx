import {
	HoverCard,
	HoverCardTrigger,
	HoverCardContent,
	HoverCardMain,
	HoverCardTitle,
	HoverCardFooter,
} from '@components/hover-card'
import { Text } from 'cadence-core'
import { Link } from '@components/link'
import { Badge, Flex } from 'cadence-core'
import { QuestionCircleOutline } from 'cadence-icons'

import type { HandbookReferenceProps } from './types'

const HandbookReference = ({
	text,
	title,
	excerpt,
	link,
	categories,
}: HandbookReferenceProps) => {
	return (
		<HoverCard openDelay={300}>
			<HoverCardTrigger asChild>
				<span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
					<Link href={link}>{text}</Link>
					<QuestionCircleOutline width={16} />
				</span>
			</HoverCardTrigger>
			<HoverCardContent>
				<HoverCardTitle>
					<Text tag="span" type="productive-body" size="body-base" collapse>
						<strong>{title}</strong>
					</Text>
				</HoverCardTitle>
				<HoverCardMain>
					<Flex direction="column" gap="small">
						<Text tag="span" type="productive-body" size="body-base" collapse>
							{excerpt}
						</Text>
						<Flex gap="small" direction="row" wrap>
							{categories.map((category) => (
								<Badge
									key={category._id}
									size="small"
									text={category.title}
									type="neutral"
								/>
							))}
						</Flex>
					</Flex>
				</HoverCardMain>
				<HoverCardFooter>
					<Text tag="span" type="productive-body" size="body-base" collapse>
						<Link href={link}>Learn more in the Handbook</Link>
					</Text>
				</HoverCardFooter>
			</HoverCardContent>
		</HoverCard>
	)
}

export { HandbookReference }
