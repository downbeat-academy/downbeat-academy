import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { readToken } from '@lib/sanity/sanity.api'
import { sanityClient } from '@lib/sanity/sanity.client'
import { contributorsBySlugQuery, contributorPaths } from '@lib/queries'
import { getSanityImageUrl } from '@utils/getSanityImage'
import { getOgTitle } from '@utils/metaHelpers'

import { SectionContainer } from '@components/section-container'
import { SectionTitle } from '@components/section-title'
import { Text } from 'cadence-core'
import { RichText } from '@components/rich-text'
import * as FeaturedItem from '@components/featured-item'
import { ListItem } from '@components/list'
import { linkResolver } from '@utils/link-resolver'
import { Flex } from 'cadence-core'

import type { Metadata, ResolvingMetadata } from 'next'
import type { MetaProps } from '../../../../types/meta'

const client = sanityClient

// Generate metadata
export async function generateMetadata(
	{ params }: MetaProps,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const { slug } = params

	try {
		const contributor = await client.fetch(contributorsBySlugQuery, {
			slug,
		})

		return {
			title: getOgTitle(contributor.name),
		}
	} catch (error) {
		console.error(error)
		throw error
	}
}

// Generate the routes for each page
export async function generateStaticParams() {
	try {
		const slugs = await client.fetch(
			contributorPaths,
			{},
			{
				next: {
					revalidate: 60,
				}
			}
		)
		return slugs.map((slug) => ({ slug }))
	} catch (error) {
		console.error(error)
		throw error
	}
}

// Render the page data
export default async function ContributorSlugRoute({ params }) {
	const { slug } = params
	const preview = draftMode().isEnabled ? { token: readToken } : undefined

	try {
		const contributor = await sanityClient.fetch(
			contributorsBySlugQuery,
			{ slug },
			{
				next: {
					revalidate: 60,
				}
			}
		)

		if (!contributor && !preview) {
			notFound()
		}

		return (
			<>
				<SectionContainer>
					<FeaturedItem.Root>
						<FeaturedItem.Title>
							<Text
								tag="h1"
								size="h1"
								type="expressive-headline"
								color="high-contrast"
								collapse
							>
								{contributor.name}
							</Text>
						</FeaturedItem.Title>
						<FeaturedItem.Description>
							<RichText value={contributor.biography.content} />
						</FeaturedItem.Description>
						<FeaturedItem.Image
							image={getSanityImageUrl(contributor.image.image.asset).url()}
							alt={contributor.name}
						/>
					</FeaturedItem.Root>
				</SectionContainer>
				<SectionContainer>
					<SectionTitle
						title={
							<Text
								tag="h2"
								type="expressive-headline"
								size="h2"
								color="primary"
								collapse
							>
								Contributions
							</Text>
						}
					/>
					<Flex direction="column" tag="section">
						{contributor.content.map((c) => {
							return (
								<ListItem
									key={c._id}
									title={c.title}
									description={c.excerpt}
									url={linkResolver(c.slug, c.type)}
								/>
							)
						})}
					</Flex>
				</SectionContainer>
			</>
		)
	} catch (error) {
		console.error(error)
		throw error
	}
}
