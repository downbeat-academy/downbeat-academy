import { Flex } from 'cadence-core'
import { Link } from '@components/link'
import { SectionContainer } from '@components/section-container'
import { SectionTitle } from '@components/section-title'
import { Text } from '@components/text'

import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: '404: Sorry, couldn&apos;t find that page',
}

export default function NotFound() {
	return (
		<SectionContainer>
			<SectionTitle
				background="critical"
				title={
					<Text
						type="expressive-headline"
						size="h1"
						tag="h1"
						color="high-contrast"
						collapse
					>
						404 :&#40;
					</Text>
				}
				subtitle={
					<Text
						type="expressive-body"
						size="body-base"
						tag="p"
						color="high-contrast"
						collapse
					>
						Sorry, couldn&apos;t find that page
					</Text>
				}
			/>
			<Flex>
				<Text type="expressive-body" size="body-base" tag="p" color="primary">
					<Link href="/">Back to the home page.</Link>
				</Text>
			</Flex>
		</SectionContainer>
	)
}
