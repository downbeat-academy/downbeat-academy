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
import s from './page.module.css'

import type { Metadata, ResolvingMetadata } from 'next'

type PageProps = {
	params: {
		slug: string
	}
}

type ArticleData = {
	metadata: {
		title: string
		description: string
	}
	title: string
	excerpt: string
	featuredImage: {
		image: {
			asset: any // Replace 'any' with proper Sanity image type
		}
		alternativeText: string
	}
	authors: any[] // Replace with proper author type
	date: string
	categories: Array<{
		title: string
		slug: string
	}>
	content: {
		content: any // Replace with proper content type
	}
}

const client = sanityClient

// Generate metadata
export async function generateMetadata(
	{ params }: PageProps,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const { slug } = params

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
	const { slug } = params

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

		const testContent =
			'Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor pulvinar vivamus fringilla lacus nec metus bibendum egestas iaculis massa nisl malesuada lacinia integer nunc posuere ut hendrerit semper vel class aptent taciti sociosqu ad litora torquent per conubia nostra inceptos himenaeos orci varius natoque penatibus et magnis dis parturient montes nascetur ridiculus mus donec rhoncus eros lobortis nulla molestie mattis scelerisque maximus eget fermentum odio phasellus non purus est efficitur laoreet mauris pharetra vestibulum fusce dictum risus blandit quis suspendisse aliquet nisi sodales consequat magna ante condimentum neque at luctus nibh finibus facilisis dapibus etiam interdum tortor ligula congue sollicitudin erat viverra ac tincidunt nam porta elementum a enim euismod quam justo lectus commodo augue arcu dignissim velit aliquam imperdiet mollis nullam volutpat porttitor ullamcorper rutrum gravida cras eleifend turpis fames primis vulputate ornare sagittis vehicula praesent dui felis venenatis ultrices proin libero feugiat tristique accumsan maecenas potenti ultricies habitant morbi senectus netus suscipit auctor curabitur facilisi cubilia curae hac habitasse platea dictumst lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor pulvinar vivamus fringilla lacus nec metus bibendum egestas iaculis massa nisl malesuada lacinia integer nunc posuere ut hendrerit semper vel class aptent taciti sociosqu ad litora torquent per conubia nostra inceptos himenaeos orci varius natoque penatibus et magnis dis parturient montes nascetur ridiculus mus donec rhoncus eros lobortis nulla molestie mattis scelerisque maximus eget fermentum odio phasellus non purus est efficitur laoreet mauris pharetra vestibulum fusce dictum risus blandit quis suspendisse aliquet nisi sodales consequat magna ante condimentum neque at luctus nibh finibus facilisis dapibus etiam interdum tortor ligula congue sollicitudin erat viverra ac tincidunt nam porta elementum a enim euismod quam justo lectus commodo augue arcu dignissim velit aliquam imperdiet mollis nullam volutpat porttitor ullamcorper rutrum gravida cras eleifend turpis fames primis vulputate ornare sagittis vehicula praesent dui felis venenatis ultrices proin libero feugiat tristique accumsan maecenas potenti ultricies habitant morbi senectus netus suscipit auctor curabitur facilisi cubilia curae hac habitasse platea dictumst lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor pulvinar vivamus fringilla lacus nec metus bibendum egestas iaculis massa nisl malesuada lacinia integer nunc posuere ut hendrerit semper vel class aptent taciti sociosqu ad litora torquent per conubia nostra inceptos himenaeos orci varius natoque penatibus et magnis dis parturient montes nascetur ridiculus mus donec rhoncus eros lobortis nulla molestie mattis scelerisque maximus eget fermentum odio phasellus non purus est efficitur laoreet mauris pharetra vestibulum fusce dictum risus blandit quis suspendisse aliquet nisi sodales consequat magna ante condimentum neque at luctus nibh finibus facilisis dapibus etiam interdum tortor ligula congue sollicitudin erat viverra ac tincidunt nam porta elementum a enim euismod quam justo lectus commodo augue arcu dignissim velit aliquam imperdiet mollis nullam volutpat porttitor ullamcorper rutrum gravida cras eleifend turpis fames primis vulputate ornare sagittis vehicula praesent dui felis venenatis ultrices proin libero feugiat tristique accumsan maecenas potenti ultricies habitant morbi senectus netus suscipit auctor curabitur facilisi cubilia curae hac habitasse platea dictumst lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor pulvinar vivamus fringilla lacus nec metus bibendum egestas iaculis massa nisl malesuada lacinia integer nunc posuere ut hendrerit semper vel class aptent taciti sociosqu ad litora torquent per conubia nostra inceptos himenaeos orci varius natoque penatibus et magnis dis parturient montes nascetur ridiculus mus donec rhoncus eros lobortis nulla molestie mattis scelerisque maximus eget fermentum odio phasellus non purus est efficitur laoreet mauris pharetra vestibulum fusce dictum risus blandit quis suspendisse aliquet nisi sodales consequat magna ante condimentum neque at luctus nibh finibus facilisis dapibus etiam interdum tortor ligula congue sollicitudin erat viverra ac tincidunt nam porta elementum a enim euismod quam justo lectus commodo augue arcu dignissim velit aliquam imperdiet mollis nullam volutpat porttitor ullamcorper rutrum gravida cras eleifend turpis fames primis vulputate ornare sagittis vehicula praesent dui felis venenatis ultrices proin libero feugiat tristique accumsan maecenas potenti ultricies habitant morbi senectus netus suscipit auctor curabitur facilisi cubilia curae hac habitasse platea dictumst lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor pulvinar vivamus fringilla lacus nec metus bibendum egestas iaculis massa nisl malesuada lacinia integer nunc posuere ut hendrerit semper vel class aptent taciti sociosqu.'

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
						</FeaturedItem.Description>
					</FeaturedItem.Root>
				</SectionContainer>
				<Flex tag="div" direction="row" gap="2x-large" className={s.content}>
					{/* <ReadingLength
						content={article.content.content}
						preContent="Approximately a "
					/> */}
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
