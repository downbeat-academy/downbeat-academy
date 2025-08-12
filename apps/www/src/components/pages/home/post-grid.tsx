import { linkResolver } from '@utils/link-resolver'
import { getSanityImageUrl } from '@utils/getSanityImage'
import { truncateString } from '@utils/truncateString'

import { Text, Grid, Card, CardContent, CardImage } from 'cadence-core'
import { Link } from '@components/link'
import { AuthorMetadata } from '@components/author'
import { prettyDate } from '@utils/dateFormat'

interface Post {
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
					<Link href={linkResolver(post.slug, 'article')} type="inherit">
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
						authors={post.authors}
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
