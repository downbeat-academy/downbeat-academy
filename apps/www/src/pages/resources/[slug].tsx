import { sanityClient } from '@lib/sanity.client'
import { getResources, getResourcePaths } from '@lib/sanity.queries'

export default function Resource({ data, preview }) {
	const { title } = data.resource

	return (
		<>
			<h1>{title}</h1>
		</>
	)
}

export const getStaticProps = async ({ params, preview = false }) => {
	const resource = await sanityClient.fetch(getResources, {
		slug: params.slug,
	})

	return {
		props: {
			preview,
			data: { resource },
		},
		revalidate: 60,
	}
}

export const getStaticPaths = async () => {
	const paths = await sanityClient.fetch(getResourcePaths)

	return {
		paths: paths.map((slug) => ({ params: { slug } })),
		fallback: false,
	}
}
