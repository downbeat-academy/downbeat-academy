import { Text } from 'cadence-core'
import { authDb } from '@/lib/db/drizzle'
import * as schema from '@/lib/db/schema'
import { count, eq, isNotNull, sql } from 'drizzle-orm'
import s from '../admin.module.css'

async function getDashboardStats() {
	const [totalUsers] = await authDb
		.select({ count: count() })
		.from(schema.user)

	const roleCounts = await authDb
		.select({
			role: schema.user.role,
			count: count(),
		})
		.from(schema.user)
		.groupBy(schema.user.role)
		.orderBy(schema.user.role)

	const [activeSessions] = await authDb
		.select({ count: count() })
		.from(schema.session)
		.where(sql`${schema.session.expiresAt} > now()`)

	const [bannedUsers] = await authDb
		.select({ count: count() })
		.from(schema.user)
		.where(eq(schema.user.banned, true))

	const recentSignups = await authDb
		.select({
			id: schema.user.id,
			name: schema.user.name,
			email: schema.user.email,
			role: schema.user.role,
			createdAt: schema.user.createdAt,
		})
		.from(schema.user)
		.orderBy(sql`${schema.user.createdAt} DESC`)
		.limit(5)

	return {
		totalUsers: totalUsers.count,
		roleCounts: roleCounts.map((r) => ({
			role: r.role ?? 'unset',
			count: r.count,
		})),
		activeSessions: activeSessions.count,
		bannedUsers: bannedUsers.count,
		recentSignups,
	}
}

export default async function AdminDashboardPage() {
	const stats = await getDashboardStats()

	return (
		<div>
			<div className={s['admin-page-header']}>
				<Text type="expressive-headline" size="h3" tag="h1" color="brand">
					Dashboard
				</Text>
			</div>

			<div className={s['admin-stats-grid']}>
				<div className={s['admin-stat-card']}>
					<div className={s['admin-stat-value']}>{stats.totalUsers}</div>
					<div className={s['admin-stat-label']}>Total Users</div>
				</div>
				<div className={s['admin-stat-card']}>
					<div className={s['admin-stat-value']}>{stats.activeSessions}</div>
					<div className={s['admin-stat-label']}>Active Sessions</div>
				</div>
				<div className={s['admin-stat-card']}>
					<div className={s['admin-stat-value']}>{stats.bannedUsers}</div>
					<div className={s['admin-stat-label']}>Banned Users</div>
				</div>
				{stats.roleCounts.map((rc) => (
					<div key={rc.role} className={s['admin-stat-card']}>
						<div className={s['admin-stat-value']}>{rc.count}</div>
						<div className={s['admin-stat-label']}>{rc.role}</div>
					</div>
				))}
			</div>

			<div className={s['admin-section']}>
				<Text type="expressive-headline" size="h5" tag="h2" color="brand">
					Recent Signups
				</Text>
				<div style={{ marginTop: 'var(--cds-scale-base)' }}>
					{stats.recentSignups.map((user) => (
						<div key={user.id} className={s['admin-detail-row']}>
							<div>
								<Text type="productive-body" size="body-base">{user.name}</Text>
								<Text type="productive-body" size="body-small" color="faint">{user.email}</Text>
							</div>
							<div>
								<Text type="productive-body" size="body-small" color="faint">
									{user.role ?? 'unset'} &middot; {user.createdAt.toLocaleDateString()}
								</Text>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
