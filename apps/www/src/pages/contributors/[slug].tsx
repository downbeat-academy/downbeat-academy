import { sanityClient } from '@lib/sanity.client'
import { getContributors, getContributorPaths } from '@lib/sanity.queries'
import { ContributorTemplate } from '@components/templates/contributor'
import { Seo } from '@components/meta'

export default function Contributor({ data, preview }) {
	const { 
		name,
		instrument,
		biography,
		avatar, 
		slug,
		content
	} = data.contributor

	return (
		<>
			<Seo title={name} />
			<ContributorTemplate
				name={name}
				avatar={avatar}
				instrument={instrument}
				biography={biography}
				slug={slug}
				content={content}
			/>
		</>
	)
}

export const getStaticProps = async ({ params, preview = false }) => {
	const contributor = await sanityClient.fetch(getContributors, {
		slug: params.slug,
	})

	return {
		props: {
			preview,
			data: { contributor },
		},
		revalidate: 60,
	}
}

export const getStaticPaths = async ({ parms, preview = false }) => {
	const paths = await sanityClient.fetch(getContributorPaths)

	return {
		paths: paths.map((slug) => ({ params: { slug } })),
		fallback: false,
	}
}
