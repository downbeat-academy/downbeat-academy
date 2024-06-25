import { linkResolver } from '@utils/link-resolver'
import { getSanityImageUrl } from '@utils/getSanityImage'
import { prettyDate } from '@utils/dateFormat'

import { Link } from '@components/link'
import { Flex } from '@components/flex'
import * as FeaturedItem from '@components/featured-item'
import { AuthorMetadata } from '@components/author'
import { Text } from '@components/text'
import { Badge } from '@components/badge'

export default async function FeaturedPost({ featuredPost }) {
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
					authors={featuredPost.authors}
					date={prettyDate(featuredPost.date)}
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
