import { sanityClient } from '@lib/sanity.client'
import { getHomepageData } from '@lib/sanity.queries'
import { HomepageTemplate } from '@components/templates/homepage'

export default function HomePage({ data, preview }) {
	return (
		<HomepageTemplate
			featuredArticle={data.homepage[0]}
			articles={data.homepage}
		/>
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
