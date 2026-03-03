import Img from 'next/image'
import { linkResolver } from '@utils/link-resolver'
import { getSanityImageUrl } from '@utils/getSanityImage'

import { Text, Grid, Card, CardContent, Avatar, Badge, Flex } from 'cadence-core'
import { Link } from '@components/link'

interface Contributor {
	_id: string
	name: string
	slug: string
	jobTitle?: string
	bio?: string
	profilePicture?: {
		asset: any
	}
	avatar?: {
		image: {
			asset: any
		}
	}
	instrument?: string[]
}

export default async function ContributorsGrid({ contributors }: { contributors: Contributor[] }) {
	const mapContributors = contributors.map((contributor) => {
		return (
			<Card borderColor="primary" key={contributor._id}>
				<CardContent>
					<Flex direction="row" alignItems="center" gap="medium">
						<Link href={linkResolver(contributor.slug, 'contributor')}>
							<Avatar
								name={contributor.name}
								size="large"
								imageObject={
									contributor.avatar?.image?.asset ? (
										<Img
											src={getSanityImageUrl(
												contributor.avatar.image.asset
											).url()}
											alt={contributor.name}
											width={80}
											height={80}
										/>
									) : undefined
								}
							/>
						</Link>
						<Flex direction="column" gap="medium">
							<Text
								tag="p"
								size="h5"
								type="expressive-headline"
								color="strong"
								collapse
							>
								<Link
									href={linkResolver(contributor.slug, 'contributor')}
									type="inherit"
								>
									{contributor.name}
								</Link>
							</Text>
							{contributor.instrument && contributor.instrument.length > 0 && (
								<Flex direction="row" gap="x-small">
									{contributor.instrument.map((instrument) => {
										return (
											<Badge
												style="outlined"
												size="small"
												text={instrument}
												key={instrument}
											/>
										)
									})}
								</Flex>
							)}
						</Flex>
					</Flex>
				</CardContent>
			</Card>
		)
	})

	return <Grid columns={3}>{mapContributors}</Grid>
}

export { ContributorsGrid }
