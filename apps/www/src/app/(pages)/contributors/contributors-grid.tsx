import Img from 'next/image'
import { linkResolver } from '@utils/link-resolver'
import { getSanityImageUrl } from '@utils/getSanityImage'

import * as Card from '@components/card'
import { Text } from 'cadence-core'
import { Grid } from 'cadence-core'
import { Link } from '@components/link'
import { Avatar } from '@components/avatar'
import { Badge, Flex } from 'cadence-core'
import { ContributorCardProps, ContributorsGridProps } from './types'

function ContributorCard({
	id,
	name,
	slug,
	avatar,
	instruments,
}: ContributorCardProps) {
	return (
		<Card.Root borderColor="primary" key={id}>
			<Card.Content>
				<Flex direction="row" alignItems="center" gap="medium">
					<Link href={linkResolver(slug, 'contributor')}>
						<Avatar name={name} size="large" imageUrl={avatar?.url} />
					</Link>
					<Flex direction="column" gap="medium">
						<Text
							tag="p"
							size="h5"
							type="expressive-headline"
							color="strong"
							collapse
						>
							<Link href={linkResolver(slug, 'contributor')} type="inherit">
								{name}
							</Link>
						</Text>
						<Flex direction="row" gap="x-small">
							{instruments.map((instrument) => (
								<Badge
									style="outlined"
									size="small"
									text={instrument}
									key={instrument}
								/>
							))}
						</Flex>
					</Flex>
				</Flex>
			</Card.Content>
		</Card.Root>
	)
}

export function ContributorsGrid({ contributors }: ContributorsGridProps) {
	return (
		<Grid columns={3}>
			{contributors.map((contributor) => (
				<ContributorCard key={contributor.id} {...contributor} />
			))}
		</Grid>
	)
}

export default ContributorsGrid
