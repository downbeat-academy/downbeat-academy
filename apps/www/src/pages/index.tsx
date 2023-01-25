import { sanityClient } from '@lib/sanity.client'
import { getHomepageData } from '@lib/sanity.queries'

import { FeaturedPost } from '@components/pages/homepage'
import { PostCard, PostGrid } from '@components/post'

export default function HomePage({ data, preview }) {
	const featuredArticle = data.homepage[0]
	const articles = data.homepage.slice(1).map((article) => {
		return (
			<PostCard
				image={article.featuredImage}
				title={article.title}
				slug={article.slug}
				authors={article.authors}
				date={article.date}
				key={article._id}
			/>
		)
	})

	return (
		<>
			<FeaturedPost input={featuredArticle} />
			<PostGrid>{articles}</PostGrid>
		</>
	)
}

export async function getStaticProps({ params, preview = false }) {
	if (preview) {
		return {
			props: { preview },
		}
	}

	const homepage = await sanityClient.fetch(getHomepageData)

	return {
		props: {
			preview,
			data: { homepage },
		},
		revalidate: 10,
	}
}
