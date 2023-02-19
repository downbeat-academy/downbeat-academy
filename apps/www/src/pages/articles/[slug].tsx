import { sanityClient } from '@lib/sanity.client'
import { getArticles, getArticlePaths } from '@lib/sanity.queries'
import { Seo } from '@components/meta'
import { ArticleTemplate } from '@components/templates/article'

export default function Article({ data, preview }) {
	const {
		title,
		content,
		excerpt,
		date,
		updatedDate,
		authors,
		categories,
		featuredImage,
		metadata,
	} = data.article

	return (
			<ArticleTemplate
				title={title}
				excerpt={excerpt}
				content={content}
				date={date}
				updatedDate={updatedDate}
				authors={authors}
				categories={categories}
				metadata={metadata}
			/>
	)
}

export async function getStaticProps({ params, preview = false }) {
	if (preview) {
		return {
			props: { preview },
		}
	}

	const article = await sanityClient.fetch(getArticles, {
		slug: params.slug,
	})

	return {
		props: {
			preview,
			data: { article },
		},
		revalidate: 10,
	}
}

export async function getStaticPaths() {
	const paths = await sanityClient.fetch(getArticlePaths)

	return {
		paths: paths.map((slug) => ({ params: { slug } })),
		fallback: false,
	}
}
