import { sanityClient } from "@lib/sanity.client"
import { getAllContributors } from "@lib/sanity.queries"
import { ContentGrid, ContentGridItem } from "@components/layout"
import { ContributorItem } from '@components/pages/contributors'
import { PageTitle } from "@components/page-title"

export default function ContributorsPage({ data, preview }) {
	
	const contributors = data.contributorsPage.map(contributor => {
		return (
			<ContributorItem
				name={contributor.name}
				slug={contributor.slug}
				avatar={contributor.avatar}
				instrument={contributor.instrument}
				key={contributor._id}
			/>
		)
	})

	return (
		<ContentGrid>
			<ContentGridItem location='center' padding='medium' gap='large'>
				<PageTitle title='Contributors' alignment='left' />
				{contributors}
			</ContentGridItem>
		</ContentGrid>
	)
}

export const getStaticProps = async ({ params, preview = false }) => {
	if (preview) {
		return {
			props: { preview },
		}
	}

	const contributorsPage = await sanityClient.fetch(getAllContributors)

	return {
		props: {
			preview,
			data: { contributorsPage }
		},
		revalidate: 60,
	}
}
