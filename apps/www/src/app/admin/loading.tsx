import { Flex, Grid, SkeletonLoader } from 'cadence-core'

export default function AdminLoading() {
	return (
		<Flex direction="column" gap="x-large">
			<SkeletonLoader height={40} width={200} />
			<Grid columns={4}>
				<SkeletonLoader height={128} />
				<SkeletonLoader height={128} />
				<SkeletonLoader height={128} />
				<SkeletonLoader height={128} />
			</Grid>
		</Flex>
	)
}
