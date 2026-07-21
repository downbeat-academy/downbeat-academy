import { Flex, Grid, Text } from 'cadence-core'
import { MetricCard } from '../_components/metric-card'
import { SubscribersTable } from './_components/subscribers-table'
import { listSubscribers } from '@/lib/admin/queries/subscribers'

function daysAgo(days: number): Date {
	const d = new Date()
	d.setDate(d.getDate() - days)
	return d
}

export default async function AdminSubscribersPage() {
	const subscribers = await listSubscribers()

	const subscribedCount = subscribers.filter((s) => !s.unsubscribed).length
	const unsubscribedCount = subscribers.filter((s) => s.unsubscribed).length
	const thirtyDaysAgo = daysAgo(30)
	const newLast30d = subscribers.filter(
		(s) => s.createdAt && s.createdAt >= thirtyDaysAgo && !s.unsubscribed
	).length

	return (
		<Flex direction="column" gap="x-large">
			<Text type="expressive-headline" size="h2" color="brand" collapse tag="h1">
				Subscribers
			</Text>

			<Grid columns={3}>
				<MetricCard label="Total subscribers" value={subscribedCount} hint="Currently subscribed" />
				<MetricCard label="Unsubscribed" value={unsubscribedCount} hint="Opted out" />
				<MetricCard label="New (30d)" value={newLast30d} hint="Recently added" />
			</Grid>

			<SubscribersTable rows={subscribers} />
		</Flex>
	)
}
