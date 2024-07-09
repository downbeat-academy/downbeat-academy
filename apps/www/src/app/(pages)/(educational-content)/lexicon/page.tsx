import { sanityClient } from '@lib/sanity/sanity.client'
import { lexiconPageQuery } from '@lib/queries'
import { formatTime } from '@utils/format-time'
import { getOgTitle } from '@utils/metaHelpers'
import { SectionContainer } from '@components/section-container'
import { SectionTitle } from '@components/section-title'
import { Text } from '@components/text'
import { LexiconItem } from './lexicon-item'
import { LexiconTable } from './lexicon-table'

import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: getOgTitle('Jazz Language Lexicon'),
	description: 'A collection of educational content from Downbeat Academy.',
}

async function getLexicons() {
	const res = sanityClient.fetch(
		lexiconPageQuery,
		{},
		{
			next: {
				revalidate: 60,
			}
		}
	)

	if (!res) {
		throw new Error('Failed to fetch data.')
	}

	return res
}

export default async function LexiconPage() {
	const lexicons = await getLexicons()
	return (
		<>
			<SectionContainer>
				<SectionTitle
					background="primary"
					title={
						<Text
							tag="h1"
							type="expressive-headline"
							size="h1"
							color="brand"
							collapse
						>
							Jazz Language Lexicon
						</Text>
					}
					subtitle={
						<Text
							tag="p"
							type="expressive-body"
							size="body-base"
							color="primary"
							collapse
						>
							The Downbeat Academy Jazz Lexicon is a collection and
							categorization of language excerpts from across the recorded jazz
							idion.
						</Text>
					}
				/>
				<LexiconTable data={lexicons} />
			</SectionContainer>
		</>
	)
}
