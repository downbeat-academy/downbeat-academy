import { notFound } from 'next/navigation'
import { sanityClient } from '@lib/sanity/sanity.client'
import { categoriesBySlugQuery, categoryPaths } from '@lib/queries'
import { getOgTitle } from '@utils/metaHelpers'
import { linkResolver } from '@utils/link-resolver'
import { Text, SectionContainer, SectionTitle } from 'cadence-core'
import { ListItem } from '@components/list'

import type { Metadata, ResolvingMetadata } from 'next'
import type { MetaProps } from '../../../../../types/meta'
import type { CategorySlug, CategoryParams, CategoryReference } from '../../../../../types/category'

const client = sanityClient

// Generate metadata
export async function generateMetadata(
	{ params }: MetaProps,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const { slug } = await params

	try {
		const category = await client.fetch(
			categoriesBySlugQuery,
			{ slug },
			{
				next: {
					revalidate: 60,
				}
			}
		)

		if (!category) return {}

		return {
			title: getOgTitle(category.title),
		}
	} catch (error) {
		console.error(error)
		throw error
	}
}

// Generate slugs/routes for categories
export async function generateStaticParams(): Promise<CategoryParams[]> {
	const slugs: CategorySlug[] = await client.fetch(categoryPaths, {}, { next: { revalidate: 60 } })
	return slugs.map((slug: string) => ({ slug }))
}

// Render the category data
export default async function CategorySlugRoute({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params

	const category = await client.fetch(
		categoriesBySlugQuery,
		{ slug },
		{ next: { revalidate: 60 } }
	)

	if (!category) notFound()

	if (!category.references || category.references.length === 0) {
		return (
			<SectionContainer>
				<SectionTitle
					background="success"
					title={
						<Text
							tag="h1"
							type="expressive-headline"
							size="h1"
							collapse
							color="high-contrast"
						>
							Category: {category.title}
						</Text>
					}
				/>
				<Text type="expressive-body" size="body-base" color="primary">
					No references found in this category.
				</Text>
			</SectionContainer>
		)
	}

	return (
		<SectionContainer>
			<SectionTitle
				background="success"
				title={
					<Text
						tag="h1"
						type="expressive-headline"
						size="h1"
						collapse
						color="high-contrast"
					>
						Category: {category.title}
					</Text>
				}
			/>
			{category.references.map((reference: CategoryReference) => {
				const title = typeof reference.title === 'string' ? reference.title : 'Untitled'
				const description = typeof reference.excerpt === 'string' ? reference.excerpt : ''
				const refType = reference._type || 'article'
				const refSlug = typeof reference.slug === 'string' ? reference.slug : ''

				return (
					<ListItem
						key={reference._id}
						title={title}
						description={description}
						url={linkResolver(refSlug, refType)}
					/>
				)
			})}
		</SectionContainer>
	)
}
