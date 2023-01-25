import { sanityClient } from '@lib/sanity.client'
import { getCategories, getCategoryPaths } from '@lib/sanity.queries'

export default function Category({ data, preview }) {
	const { title } = data.category

	return (
		<>
			<h1>{title}</h1>
		</>
	)
}

export const getStaticProps = async ({ params, preview = false }) => {
	const category = await sanityClient.fetch(getCategories, {
		slug: params.slug,
	})

	return {
		props: {
			preview,
			data: { category },
		},
		revalidate: 60,
	}
}

export const getStaticPaths = async () => {
	const paths = await sanityClient.fetch(getCategoryPaths)

	return {
		paths: paths.map((slug) => ({ params: { slug } })),
		fallback: false,
	}
}
