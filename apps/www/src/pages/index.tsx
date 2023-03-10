import { sanityClient } from '@lib/sanity.client'
import { getHomepageData } from '@lib/sanity.queries'
import { Seo } from '@components/meta'
import { FeaturedPost } from '@components/pages/homepage'
import { PostCard, PostGrid } from '@components/post'
import { ContentGrid, ContentGridItem } from '@components/layout'
import CdsButton from 'cadence-react'

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
			<Seo
				title='Resources for advancing musicians, students, and educators'
				description='Downbeat Academy features music education and resources for the masses, taught by accomplished musicians and educators in the field'
				url='/'
			/>
			<ContentGrid>
				<CdsButton text='Button' />
				<ContentGridItem location='full-bleed' padding='none'>
					<FeaturedPost input={featuredArticle} />
					<PostGrid>{articles}</PostGrid>
				</ContentGridItem>
			</ContentGrid>
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
