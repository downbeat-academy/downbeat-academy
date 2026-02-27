import { Fragment } from 'react'
import { linkResolver } from '@utils/link-resolver'
import { getSanityImageUrl } from '@utils/getSanityImage'
import { prettyDate } from '@utils/dateFormat'

import { Link } from '@components/link'
import * as FeaturedItem from '@components/featured-item'
import { AuthorMetadata } from '@components/author'
import { Text } from 'cadence-core'

interface FeaturedPostType {
	_id: string
	slug: string
	title: string
	date: string
	excerpt?: string
	featuredImage: {
		image: {
			asset: any
		}
		alternativeText?: string
	}
	authors?: Array<{
		name: string
		slug?: string
		image?: any
	}>
	categories: Array<{
		title: string
		slug: string
	}>
}

export default async function FeaturedPost({ featuredPost }: { featuredPost: FeaturedPostType }) {
	const renderCategories = (
		<Text tag="p" type="productive-body" size="body-small" collapse>
			{featuredPost.categories.map((category, i) => (
				<Fragment key={category.title}>
					{i > 0 && ', '}
					<Link href={linkResolver(category.slug, 'category')} type="secondary">
						{category.title}
					</Link>
				</Fragment>
			))}
		</Text>
	)

	return (
		<FeaturedItem.Root>
			<FeaturedItem.Title background="brand">
				<Text
					tag="h1"
					type="expressive-headline"
					size="h1"
					color="high-contrast"
					collapse
				>
					<Link
						href={linkResolver(featuredPost.slug, 'article')}
						type="inherit"
					>
						{featuredPost.title}
					</Link>
				</Text>
				<Text
					tag="p"
					type="expressive-body"
					size="body-large"
					color="high-contrast"
					collapse
				>
					{featuredPost.excerpt}
				</Text>
			</FeaturedItem.Title>
			<FeaturedItem.Description>
				<AuthorMetadata
					authors={featuredPost.authors}
					date={prettyDate(featuredPost.date)}
				>
					{renderCategories}
				</AuthorMetadata>
			</FeaturedItem.Description>
			<FeaturedItem.Image
				image={getSanityImageUrl(featuredPost.featuredImage.image.asset).url()}
				alt={featuredPost.featuredImage.alternativeText}
				url={linkResolver(featuredPost.slug, 'article')}
			/>
		</FeaturedItem.Root>
	)
}

export { FeaturedPost }
