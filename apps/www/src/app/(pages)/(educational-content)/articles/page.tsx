import { sanityClient } from '@lib/sanity/sanity.client'
import { articlesPageQuery } from '@lib/queries'
import { getOgTitle } from '@utils/metaHelpers'

import { SectionContainer } from '@components/section-container'
import { SectionTitle } from '@components/section-title'
import { Text } from 'cadence-core'
import { ArticlesPostGrid } from '../../../../components/pages/articles'

import type { Metadata } from 'next'

const client = sanityClient

export const metadata: Metadata = {
	title: getOgTitle('Articles'),
	description: 'Recent articles and learning materials from Downbeat Academy.',
}

async function getArticles() {
	try {
		const res = await client.fetch(
			articlesPageQuery,
			{},
			{
				next: {
					revalidate: 60,
				},
			}
		)
		return res
	} catch (error) {
		console.error(error)
		throw error
	}
}

export default async function ArticlesPage() {
	const articles = await getArticles()

	return (
		<>
			<SectionContainer>
				<SectionTitle
					title={
						<Text tag="h1" type="expressive-headline" size="h1" collapse>
							Recent articles
						</Text>
					}
				/>
				<ArticlesPostGrid articles={articles} />
			</SectionContainer>
		</>
	)
}
