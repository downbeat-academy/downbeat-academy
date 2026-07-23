import { Flex, Grid, Text } from 'cadence-core'
import { MetricCard } from './_components/metric-card'
import { RecentListCard, RecentListRow } from './_components/recent-list-card'
import { ChartCard } from './_components/chart-card'
import { UsersOverTimeChart } from './_components/charts/users-over-time-chart'
import { ProviderBreakdownChart } from './_components/charts/provider-breakdown-chart'
import {
	countUsers,
	countUsersSince,
	activeSessionCount,
	recentUsers,
	recentSessions,
	countSubscribers,
	usersOverTime,
	authProviderBreakdown,
} from '@/lib/admin/queries'
import { formatRelativeTime, truncate } from '@/lib/admin/format'

function daysAgo(days: number): Date {
	const d = new Date()
	d.setDate(d.getDate() - days)
	return d
}

export default async function AdminOverviewPage() {
	const sevenDaysAgo = daysAgo(7)
	const thirtyDaysAgo = daysAgo(30)

	const [
		totalUsers,
		usersLast7d,
		usersLast30d,
		activeSessions,
		subscriberCount,
		latestUsers,
		latestSessions,
		signupTimeline,
		providers,
	] = await Promise.all([
		countUsers(),
		countUsersSince(sevenDaysAgo),
		countUsersSince(thirtyDaysAgo),
		activeSessionCount(),
		countSubscribers(),
		recentUsers(10),
		recentSessions(10),
		usersOverTime(90),
		authProviderBreakdown(),
	])

	const monthlyDelta = usersLast30d

	return (
		<Flex direction="column" gap="x-large">
			<Text type="expressive-headline" size="h2" color="brand" collapse tag="h1">
				Overview
			</Text>

			<Grid columns={4}>
				<MetricCard
					label="Total users"
					value={totalUsers}
					delta={
						monthlyDelta === 0
							? undefined
							: {
									value: monthlyDelta,
									direction: monthlyDelta > 0 ? 'up' : 'down',
									label: 'in 30d',
								}
					}
				/>
				<MetricCard
					label="New users (7d)"
					value={usersLast7d}
					hint={`${usersLast30d} in last 30d`}
				/>
				<MetricCard
					label="Active sessions"
					value={activeSessions}
					hint="Sessions not yet expired"
				/>
				<MetricCard
					label="Newsletter subscribers"
					value={subscriberCount}
					hint="Resend audience"
				/>
			</Grid>

			<Grid columns={2}>
				<ChartCard title="Users over time" description="Last 90 days">
					<UsersOverTimeChart data={signupTimeline} />
				</ChartCard>
				<ChartCard
					title="Auth providers"
					description="Distribution across connected accounts"
				>
					<ProviderBreakdownChart data={providers} />
				</ChartCard>
			</Grid>

			<Grid columns={2}>
				<RecentListCard
					title="Recent signups"
					emptyLabel="No signups yet"
					items={latestUsers.map((u) => (
						<RecentListRow
							key={u.id}
							primary={u.name || u.email}
							secondary={u.name ? u.email : undefined}
							meta={formatRelativeTime(u.createdAt)}
						/>
					))}
				/>
				<RecentListCard
					title="Recent sessions"
					emptyLabel="No sessions recorded"
					items={latestSessions.map((sess) => (
						<RecentListRow
							key={sess.id}
							primary={sess.userName || sess.userEmail || sess.userId}
							secondary={
								sess.ipAddress || sess.userAgent
									? `${sess.ipAddress ?? '—'} · ${truncate(sess.userAgent, 50)}`
									: undefined
							}
							meta={formatRelativeTime(sess.createdAt)}
						/>
					))}
				/>
			</Grid>
		</Flex>
	)
}
