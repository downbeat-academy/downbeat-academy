import { linkResolver } from '@utils/link-resolver'
import { getSanityImageUrl } from '@utils/getSanityImage'
import { truncateString } from '@utils/truncateString'

import NextLink from 'next/link'
import { Text, Grid, Card, CardContent, CardImage, Link } from 'cadence-core'
import { AuthorMetadata } from '@components/author'
import { prettyDate } from '@utils/dateFormat'

interface Post {
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
		image?: {
			asset: any
		}
	}>
}

export default async function HomePostGrid({ posts }: { posts: Post[] }) {
	const mapPosts = posts.map((post) => {
		return (
			<Card borderColor="faint" key={post._id}>
				<CardImage
					image={getSanityImageUrl(post.featuredImage.image.asset).url()}
					alt={post.featuredImage.alternativeText}
					url={linkResolver(post.slug, 'article')}
				/>
				<CardContent>
					<Link as={NextLink} href={linkResolver(post.slug, 'article')} type="inherit">
						<Text type="expressive-headline" size="h4" collapse>
							{post.title}
						</Text>
					</Link>
					{post.excerpt && (
						<Text type="expressive-body" size="body-small" collapse>
							{truncateString(post.excerpt, 180)}
						</Text>
					)}
					<AuthorMetadata
						authors={post.authors || []}
						avatarSize="small"
						date={prettyDate(post.date)}
					/>
				</CardContent>
			</Card>
		)
	})

	return <Grid columns={3}>{mapPosts}</Grid>
}

export { HomePostGrid }
