import { sanityClient } from '@lib/sanity/sanity.client'
import { articlesBySlugQuery, articlePaths } from '@lib/queries'
import { getSanityImageUrl } from '@utils/getSanityImage'
import { prettyDate } from '@utils/dateFormat'
import { linkResolver } from '@utils/link-resolver'
import { getOgTitle } from '@utils/metaHelpers'
import { Text, Flex } from 'cadence-core'
import { SectionContainer } from '@components/section-container'
import * as FeaturedItem from '@components/featured-item'
import { AuthorMetadata } from '@components/author'
import { RichText, RichTextWrapper } from '@components/rich-text'
import { Badge } from 'cadence-core'
import { Link } from '@components/link'
import { NewsletterSignup } from '@components/newsletter-signup'
import { TableOfContents } from '@components/table-of-contents'
import { ReadingLength } from '@components/reading-length'
import { Summary } from '@components/summary'
import s from './page.module.css'

import type { Metadata, ResolvingMetadata } from 'next'
import type { PageProps, ArticleData } from './types'

const client = sanityClient

// Generate metadata
export async function generateMetadata(
	{ params }: PageProps,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const { slug } = await params

	try {
		const article = await client.fetch<ArticleData>(
			articlesBySlugQuery,
			{ slug },
			{ next: { revalidate: 60 } }
		)

		return {
			title: getOgTitle(article.metadata.title),
			description: article.metadata.description,
		}
	} catch (error) {
		console.error(error)
		throw error
	}
}

// Generate static params
export async function generateStaticParams() {
	try {
		const slugs = await sanityClient.fetch(
			articlePaths,
			{},
			{ next: { revalidate: 60 } }
		)
		return slugs.map((slug: string) => ({ slug }))
	} catch (error) {
		console.error(error)
		throw error
	}
}

// Render the article data
export default async function ArticleSlugRoute({ params }: PageProps) {
	const { slug } = await params

	try {
		const article = await sanityClient.fetch<ArticleData>(
			articlesBySlugQuery,
			{ slug },
			{ next: { revalidate: 60 } }
		)

		// Rest of your component code remains the same
		const renderCategories = article.categories.map((category) => {
			return (
				<Link
					href={linkResolver(category.slug, 'category')}
					key={category.title}
				>
					<Badge type="neutral" style="filled" text={category.title} />
				</Link>
			)
		})

		return (
			<>
				<SectionContainer>
					<FeaturedItem.Root>
						<FeaturedItem.Title>
							<Text
								tag="h1"
								type="expressive-headline"
								size="h1"
								color="high-contrast"
								collapse
							>
								{article.title}
							</Text>
							<Text
								tag="p"
								type="expressive-body"
								size="body-large"
								color="high-contrast"
								collapse
							>
								{article.excerpt}
							</Text>
						</FeaturedItem.Title>
						<FeaturedItem.Image
							image={getSanityImageUrl(article.featuredImage.image.asset).url()}
							alt={article.featuredImage.alternativeText}
						/>
						<FeaturedItem.Description>
							<AuthorMetadata
								authors={article.authors}
								date={prettyDate(article.date)}
							>
								<Flex tag="div" direction="row" gap="medium">
									{renderCategories}
								</Flex>
							</AuthorMetadata>
							<ReadingLength
								content={article.content.content}
								preContent="Around a "
							/>
						</FeaturedItem.Description>
					</FeaturedItem.Root>
				</SectionContainer>
				<Summary
					isOpen={false}
					type='flush'
					size='small'
					title={{
						text: 'Summary',
					}}
				>
					<Text tag="p" collapse type="expressive-body" size="body-small" color="primary">
						This is the content of the summary.
					</Text>
				</Summary>
				<Flex tag="div" direction="row" gap="2x-large" className={s.content}>
					<RichTextWrapper>
						<RichText value={article.content.content} />
						<NewsletterSignup
							title="Enjoy this article?"
							description="Get new and interesting articles directly in your inbox. Generally every few weeks or once a month."
						/>
					</RichTextWrapper>
					<TableOfContents
						content={article.content.content}
						title="On this page"
					/>
				</Flex>
			</>
		)
	} catch (error) {
		console.error(error)
		throw error
	}
}
