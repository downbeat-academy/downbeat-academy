import { linkResolver } from '@utils/link-resolver'
import { getSanityImageUrl } from '@utils/getSanityImage'
import { truncateString } from '@utils/truncateString'

import { Text, Grid, Card, CardContent, CardImage } from 'cadence-core'
import { Link } from '@components/link'
import { AuthorMetadata } from '@components/author'
import { prettyDate } from '@utils/dateFormat'

export default async function ArticlesPostGrid({ articles }) {
	const mapArticles = articles.map((article) => {
		return (
			<Card borderColor="faint" key={article._id}>
				<CardImage
					image={getSanityImageUrl(article.featuredImage.image.asset).url()}
					alt={article.featuredImage.alternativeText}
					url={linkResolver(article.slug, 'article')}
				/>
				<CardContent>
					<Link href={linkResolver(article.slug, 'article')} type="inherit">
						<Text type="expressive-headline" size="h4" collapse>
							{article.title}
						</Text>
					</Link>
					{article.excerpt && (
						<Text type="expressive-body" size="body-small" collapse>
							{truncateString(article.excerpt, 180)}
						</Text>
					)}
					<AuthorMetadata
						authors={article.authors}
						avatarSize="small"
						date={prettyDate(article.date)}
					/>
				</CardContent>
			</Card>
		)
	})

	return <Grid columns={3}>{mapArticles}</Grid>
}

export { ArticlesPostGrid }
