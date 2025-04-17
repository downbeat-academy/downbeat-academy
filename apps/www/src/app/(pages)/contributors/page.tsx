import { getOgTitle } from '@utils/metaHelpers'
import { SectionContainer } from '@components/section-container'
import { SectionTitle } from '@components/section-title'
import { Text } from 'cadence-core'
import { ContributorsGrid } from './contributors-grid'
import { getContributorsData } from './getContributorsData'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: getOgTitle('Contributors'),
	description: 'Downbeat Academy authors and contributors.',
}

export default async function ContributorsPage() {
	const contributors = await getContributorsData()
	console.log(contributors[0].instruments)

	// Transform the data to match the new interface
	const transformedContributors = contributors.map((contributor) => ({
		id: contributor.id,
		name: contributor.name,
		slug: contributor.slug,
		avatar: contributor.avatar,
		instruments: contributor.instruments.map((instrument) => instrument.name),
	}))

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
							Contributors
						</Text>
					}
				/>
				<ContributorsGrid contributors={transformedContributors} />
			</SectionContainer>
		</>
	)
}
