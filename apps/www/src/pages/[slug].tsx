import { sanityClient } from '@lib/sanity.client'
import { getPages, getPagePaths } from '@lib/sanity.queries'
import { PageTemplate } from '@templates/page'


export default function Page({ data, preview }) {
	const { title, moduleContent, showTitle, slug, metadata } = data.page

	console.log(moduleContent)

	return (
		<PageTemplate
			title={title}
			moduleContent={moduleContent}
		/>
	)
}

export const getStaticProps = async ({ params, preview = false }) => {
	const page = await sanityClient.fetch(getPages, {
		slug: params.slug,
	})

	return {
		props: {
			preview,
			data: { page },
		},
		revalidate: 10,
	}
}

export const getStaticPaths = async () => {
	const paths = await sanityClient.fetch(getPagePaths)

	return {
		paths: paths.map((slug) => ({ params: { slug } })),
		fallback: false,
	}
}
