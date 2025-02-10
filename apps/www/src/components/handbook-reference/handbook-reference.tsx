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
			<HoverCardTrigger hasIcon>
				<Link href={link}>{text}</Link>
			</HoverCardTrigger>
			<HoverCardContent>
				<HoverCardTitle>
					<Text tag="p" type="productive-body" size="body-base" collapse>
						<strong>{title}</strong>
					</Text>
				</HoverCardTitle>
				<HoverCardMain>
					<Flex direction="column" gap="small">
						<Text tag="p" type="productive-body" size="body-base" collapse>
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
					<Text tag="p" type="productive-body" size="body-base" collapse>
						<Link href={link}>Learn more in the Handbook</Link>
					</Text>
				</HoverCardFooter>
			</HoverCardContent>
		</HoverCard>
	)
}

export { HandbookReference }
