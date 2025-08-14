import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { readToken } from '@lib/sanity/sanity.api'
import { sanityClient } from '@lib/sanity/sanity.client'
import { pagesBySlugQuery, pagePaths } from '@lib/queries'
import { getOgTitle } from '@utils/metaHelpers'

import { SectionContainer } from '@components/section-container'
import { SectionTitle } from '@components/section-title'
import { Text } from 'cadence-core'
import { ModuleRenderer } from '@components/module-content'

import type { Metadata, ResolvingMetadata } from 'next'
import type { MetaProps } from '../../../types/meta'
import type { SlugParams, SlugString } from '../../../types/common'

const client = sanityClient

// Generate metadata
export async function generateMetadata(
	{ params }: MetaProps,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const { slug } = await params
	try {
		const page = await client.fetch(
			pagesBySlugQuery,
			{ slug },
			{
				next: {
					revalidate: 60,
				},
			}
		)

		const { title } = page.metadata
		return {
			title: getOgTitle(title),
			description: page.metadata.description,
		}
	} catch (error) {
		console.error(error)
		throw error
	}
}

// Generate the slugs/routes for each page
export async function generateStaticParams(): Promise<SlugParams[]> {
	try {
		const slugs: SlugString[] = await client.fetch(pagePaths)
		return slugs.map((slug: string) => ({ slug }))
	} catch (error) {
		console.error(error)
		throw error
	}
}

// Render the page data
export default async function PageSlugRoute({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const preview = (await draftMode()).isEnabled ? { token: readToken } : undefined

	try {
		const page = await sanityClient.fetch(pagesBySlugQuery, {
			slug,
		})

		if (!page && !preview) {
			notFound()
		}
		return (
			<>
				<SectionContainer>
					<SectionTitle
						background="primary"
						title={
							<Text
								tag="h1"
								size="h1"
								type="expressive-headline"
								color="brand"
								collapse
							>
								{page.title}
							</Text>
						}
					/>
					<ModuleRenderer modules={page.moduleContent} />
				</SectionContainer>
			</>
		)
	} catch (error) {
		console.error(error)
		throw error
	}
}
