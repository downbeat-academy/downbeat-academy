'use client'

import {
	HoverCard,
	HoverCardTrigger,
	HoverCardContent,
	HoverCardMain,
	HoverCardTitle,
	HoverCardFooter,
	Text,
	Badge,
	Flex,
	Link,
} from 'cadence-core'
import NextLink from 'next/link'
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
				<Link as={NextLink} href={link}>
					{text}
					<QuestionCircleOutline width={16} aria-label="More information available" />
				</Link>
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
						<Link as={NextLink} href={link}>Learn more in the Handbook</Link>
					</Text>
				</HoverCardFooter>
			</HoverCardContent>
		</HoverCard>
	)
}

export { HandbookReference }
