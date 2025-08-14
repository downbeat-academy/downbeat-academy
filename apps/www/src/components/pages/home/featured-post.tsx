import { linkResolver } from '@utils/link-resolver'
import { getSanityImageUrl } from '@utils/getSanityImage'
import { prettyDate } from '@utils/dateFormat'

import { Link } from '@components/link'
import * as FeaturedItem from '@components/featured-item'
import { AuthorMetadata } from '@components/author'
import { Text } from 'cadence-core'
import { Badge, Flex } from 'cadence-core'

interface FeaturedPostType {
	_id: string
	slug: string
	title: string
	publishedAt: string
	excerpt?: string
	featuredImage: {
		image: {
			asset: any
		}
		alternativeText?: string
	}
	author?: {
		name: string
		slug?: string
		profilePicture?: {
			asset: any
		}
	}
	categories: Array<{
		title: string
		slug: string
	}>
}

export default async function FeaturedPost({ featuredPost }: { featuredPost: FeaturedPostType }) {
	// Render the categories of the featured post as badges
	const renderCategories = featuredPost.categories.map((category) => {
		return (
			<Link href={linkResolver(category.slug, 'category')} key={category.title}>
				<Badge type="neutral" style="filled" text={category.title} />
			</Link>
		)
	})

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
					authors={featuredPost.author ? [featuredPost.author] : []}
					date={prettyDate(featuredPost.publishedAt)}
				>
					<Flex tag="div" direction="row" gap="medium">
						{renderCategories}
					</Flex>
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
