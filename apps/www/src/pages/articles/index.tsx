import { sanityClient } from '@lib/sanity.client'
import { getAllArticles } from '@lib/sanity.queries'
import { PostCard } from "@components/post"
import { ArticlesPageWrapper } from '@components/pages/articles'
import { ContentGrid, ContentGridItem } from '@components/layout'

export default function ArticlesPage({ data, preview }) {

	const articles = data.articlesPage.map((article) => {
		return (
			<PostCard
				image={article.featuredImage}
				title={article.title}
				slug={article.slug}
				authors={article.authors}
				date={article.date}
				excerpt={article.excerpt}
				key={article._id}
			/>
		)
	})

	return (
		<ContentGrid>
			<ArticlesPageWrapper>
				{articles}
			</ArticlesPageWrapper>
		</ContentGrid>
	)
}

export const getStaticProps = async ({ params, preview = false }) => {
	if (preview) {
		return {
			props: { preview },
		}
	}

	const articlesPage = await sanityClient.fetch(getAllArticles)

	return {
		props: {
			preview,
			data: { articlesPage }
		},
		revalidate: 60,
	}
}
