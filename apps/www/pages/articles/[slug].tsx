import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { sanityClient } from '@lib/sanity.client'
import { GET_ALL_ARTICLES, GET_ARTICLE_PATHS } from "@lib/queries"

export default function Article({ data, preview }) {

	const {
		title,
		content,
		excerpt,
		date,
		_updatedAt,
		authors,
		categories,
		featuredImage,
		metadata
	} = data.article

	return (<h1>{title}</h1>)
}

export const getStaticProps: GetStaticProps = async ({ params, preview = false }) => {
	const article = await sanityClient.fetch(GET_ALL_ARTICLES, {
		slug: params.slug,
	});

	return {
		props: {
			preview,
			data: { article },
		},
		revalidate: 10,
	};
}

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = await sanityClient.fetch(GET_ARTICLE_PATHS);

	return {
		paths: paths.map((slug) => ({ params: { slug } })),
		fallback: false,
	};
}