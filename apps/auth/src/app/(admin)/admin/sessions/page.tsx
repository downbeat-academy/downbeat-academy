import { Text } from 'cadence-core'
import { authDb } from '@/lib/db/drizzle'
import * as schema from '@/lib/db/schema'
import { sql, eq } from 'drizzle-orm'
import { SessionsTable } from './sessions-table'
import s from '../../admin.module.css'

async function getActiveSessions() {
	const rows = await authDb
		.select({
			id: schema.session.id,
			userName: schema.user.name,
			userEmail: schema.user.email,
			ipAddress: schema.session.ipAddress,
			userAgent: schema.session.userAgent,
			createdAt: schema.session.createdAt,
			expiresAt: schema.session.expiresAt,
		})
		.from(schema.session)
		.innerJoin(schema.user, eq(schema.session.userId, schema.user.id))
		.where(sql`${schema.session.expiresAt} > now()`)
		.orderBy(sql`${schema.session.createdAt} DESC`)
		.limit(100)

	return rows.map((r) => ({
		id: r.id,
		userName: r.userName,
		userEmail: r.userEmail,
		ipAddress: r.ipAddress,
		userAgent: r.userAgent,
		createdAt: r.createdAt.toLocaleString(),
		expiresAt: r.expiresAt.toLocaleString(),
	}))
}

export default async function SessionsPage() {
	const sessions = await getActiveSessions()

	return (
		<div>
			<div className={s['admin-page-header']}>
				<Text type="expressive-headline" size="h3" tag="h1" color="brand">
					Active Sessions
				</Text>
				<Text type="productive-body" size="body-base" color="faint">
					{sessions.length} active session{sessions.length !== 1 ? 's' : ''}
				</Text>
			</div>
			<SessionsTable sessions={sessions} />
		</div>
	)
}
