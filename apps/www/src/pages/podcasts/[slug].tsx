import { sanityClient } from '@lib/sanity.client'
import { getPodcasts, getPodcastPaths } from '@lib/sanity.queries'

export default function Podcast({ data, preview }) {
	const { title } = data.podcast

	return (
		<>
			<h1>{title}</h1>
		</>
	)
}

export const getStaticProps = async ({ params, preview = false }) => {
	const podcast = await sanityClient.fetch(getPodcasts, {
		slug: params.slug,
	})

	return {
		props: {
			preview,
			data: { podcast },
		},
		revalidate: 60,
	}
}

export const getStaticPaths = async () => {
	const paths = await sanityClient.fetch(getPodcastPaths)

	return {
		paths: paths.map((slug) => ({ params: { slug } })),
		fallback: false,
	}
}
