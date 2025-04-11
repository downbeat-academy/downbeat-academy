import { sanityClient } from '@lib/sanity/sanity.client'
import { contributorsPageQuery } from '@lib/queries'
import { getOgTitle } from '@utils/metaHelpers'
import { SectionContainer } from '@components/section-container'
import { SectionTitle } from '@components/section-title'
import { Text } from 'cadence-core'
import { ContributorsGrid } from '@components/pages/contributors'
import { getContributorsData } from './getContributorsData'

import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: getOgTitle('Contributors'),
	description: 'Downbeat Academy authors and contributors.',
}

// async function getContributors() {
// 	const res = sanityClient.fetch(
// 		contributorsPageQuery,
// 		{},
// 		{
// 			next: {
// 				revalidate: 60,
// 			},
// 		}
// 	)

// 	if (!res) {
// 		throw new Error('Failed to fetch data.')
// 	}

// 	return res
// }

export default async function ContributorsPage() {
	const contributors = await getContributorsData()
	console.log(contributors)

	return (
		<>
			<SectionContainer>
				<SectionTitle
					hasBorder={false}
					background="brand"
					title={
						<Text
							tag="h1"
							type="expressive-headline"
							size="h1"
							color="high-contrast"
							collapse
						>
							Contributors and authors
						</Text>
					}
				/>
				<div>
					{contributors.map((contributor) => (
						<div key={contributor.id}>{contributor.name}</div>
					))}
				</div>
				{/* <ContributorsGrid contributors={contributors} /> */}
			</SectionContainer>
		</>
	)
}
