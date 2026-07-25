import { Flex, Grid, Text } from 'cadence-core'
import { MetricCard } from './_components/metric-card'
import { RecentListCard, RecentListRow } from './_components/recent-list-card'
import { ChartCard } from './_components/chart-card'
import { UsersOverTimeChart } from './_components/charts/users-over-time-chart'
import { ProviderBreakdownChart } from './_components/charts/provider-breakdown-chart'
import {
	dashboardStats,
	recentUsers,
	recentSessions,
	countSubscribers,
	usersOverTime,
	authProviderBreakdown,
} from '@/lib/admin/queries'
import { formatRelativeTime, truncate } from '@/lib/admin/format'

const RECENT_WINDOW_DAYS = 7
const EXTENDED_WINDOW_DAYS = 30

export default async function AdminOverviewPage() {
	const [stats, subscriberCount, latestUsers, latestSessions, signupTimeline, providers] =
		await Promise.all([
			dashboardStats(RECENT_WINDOW_DAYS, EXTENDED_WINDOW_DAYS),
			countSubscribers(),
			recentUsers(10),
			recentSessions(10),
			usersOverTime(90),
			authProviderBreakdown(),
		])

	const { totalUsers, newUsersRecent, newUsersExtended, activeSessions } = stats
	const monthlyDelta = newUsersExtended

	return (
		<Flex direction="column" gap="x-large">
			<Text type="productive-headline" size="h2" color="brand" collapse tag="h1">
				Overview
			</Text>

			<Grid columns={4} gap="medium" minColumnWidth="200px">
				<MetricCard
					label="Total users"
					value={totalUsers}
					delta={
						monthlyDelta === 0
							? undefined
							: {
									value: monthlyDelta,
									direction: monthlyDelta > 0 ? 'up' : 'down',
									label: `in ${EXTENDED_WINDOW_DAYS}d`,
								}
					}
				/>
				<MetricCard
					label={`New users (${RECENT_WINDOW_DAYS}d)`}
					value={newUsersRecent}
					hint={`${newUsersExtended} in last ${EXTENDED_WINDOW_DAYS}d`}
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

			<Grid columns={2} gap="medium" minColumnWidth="360px">
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

			<Grid columns={2} gap="medium" minColumnWidth="360px">
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
