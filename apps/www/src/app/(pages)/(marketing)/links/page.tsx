import { notFound } from 'next/navigation'
import { sanityClient } from '@lib/sanity/sanity.client'
import { linkInBioPageQuery } from '@lib/queries/sanity.link-in-bio'
import { SectionContainer } from '@components/section-container'
import { SectionTitle } from '@components/section-title'
import { ListItem } from '@components/list'
import { Text } from 'cadence-core'
import { linkResolver } from '@utils/link-resolver'

import type { Metadata } from 'next'

const client = sanityClient

// Generate metadata
export const metadata: Metadata = {
	title: 'Link in Bio | Downbeat Academy',
	description:
		'Find all the links mentioned in our social media profiles here.',
}

// Render the page data
export default async function LinkInBioPage({ params }) {
	try {
		const links = await client.fetch(
			linkInBioPageQuery,
			{},
			{
				next: {
					revalidate: 60,
				}
			}
		)
		if (!links) {
			return notFound()
		}

		const renderLinks = links.map((link) => {
			return (
				<ListItem
					key={link._id}
					title={link.title}
					description={link.description}
					url={linkResolver(link.link.slug, link.link._type)}
				/>
			)
		})

		return (
			<SectionContainer>
				<SectionTitle
					background="primary"
					title={
						<Text
							type="expressive-headline"
							size="h4"
							tag="h1"
							color="brand"
							collapse
						>
							Downbeat Academy Links
						</Text>
					}
				/>
				{renderLinks}
			</SectionContainer>
		)
	} catch (error) {
		console.error(error)
		throw error
	}
}
