import { sanityClient } from '@lib/sanity/sanity.client'
import { handbooksBySlugQuery, handbookPaths } from '@lib/queries'
import { getOgTitle } from '@utils/metaHelpers'
import { Text } from 'cadence-core'
import { SectionContainer } from '@components/section-container'
import { SectionTitle } from '@components/section-title'
import { RichText, RichTextWrapper } from '@components/rich-text'
import { Badge } from 'cadence-core'
import { Link } from '@components/link'
import s from './handbook-page.module.scss'

import type { Metadata, ResolvingMetadata } from 'next'

type PageProps = {
	params: Promise<{ slug: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const client = sanityClient

// Generate metadata
export async function generateMetadata(props: PageProps, parent: ResolvingMetadata): Promise<Metadata> {
	const params = await props.params
	const { slug } = params

	try {
		const article = await sanityClient.fetch(
			handbooksBySlugQuery,
			{ slug },
			{
				next: {
					revalidate: 60,
				}
			}
		)

		return {
			title: getOgTitle(article.title),
			description: article.excerpt,
		}
	} catch (error) {
		console.error(error)
		throw error
	}
}

// Generate the slugs/routes for the handbooks
export async function generateStaticParams() {
	try {
		const slugs = await sanityClient.fetch(
			handbookPaths,
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

// Render the handbook data
export default async function HandbookSlugRoute(props: PageProps) {
	const params = await props.params
	const { slug } = params

	try {
		const handbook = await sanityClient.fetch(
			handbooksBySlugQuery,
			{ slug },
			{
				next: {
					revalidate: 60,
				}
			}
		)

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
								color="high-contrast"
								collapse
							>
								{handbook.title}
							</Text>
						}
					/>
					<aside className={s.categories}>
						<Text tag="p" type="expressive-body" size="body-base" collapse>
							Categories:
						</Text>
						{handbook.categories.map((category) => (
							<Link key={category.title} href={`/category/${category.slug}`}>
								<Badge text={category.title} />
							</Link>
						))}
					</aside>
					<RichTextWrapper className={s['rich-text']}>
						<RichText value={handbook.content.content} />
					</RichTextWrapper>
				</SectionContainer>
			</>
		)
	} catch (error) {
		console.error(error)
		throw error
	}
}
