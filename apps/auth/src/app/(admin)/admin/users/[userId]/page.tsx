import { Text } from 'cadence-core'
import { eq } from 'drizzle-orm'
import { getOptionalSession } from '@/lib/auth/require-auth'
import { authDb } from '@/lib/db/drizzle'
import * as schema from '@/lib/db/schema'
import { UserDetail } from './user-detail'
import s from '../../../admin.module.css'

interface UserDetailPageProps {
	params: Promise<{ userId: string }>
}

export default async function UserDetailPage({ params }: UserDetailPageProps) {
	const { userId } = await params
	const session = await getOptionalSession()
	const currentUserRole = session?.user?.role as string | undefined

	const [userData] = await authDb
		.select()
		.from(schema.user)
		.where(eq(schema.user.id, userId))
		.limit(1)

	if (!userData) {
		return (
			<div>
				<div className={s['admin-page-header']}>
					<Text type="expressive-headline" size="h3" tag="h1" color="brand">
						User Details
					</Text>
				</div>
				<Text type="productive-body" size="body-base" color="faint">User not found.</Text>
			</div>
		)
	}

	const initialUser = {
		id: userData.id,
		name: userData.name,
		email: userData.email,
		role: userData.role,
		banned: userData.banned,
		banReason: userData.banReason,
		banExpires: userData.banExpires?.toISOString() ?? null,
		emailVerified: userData.emailVerified,
		image: userData.image,
		createdAt: userData.createdAt.toISOString(),
		updatedAt: userData.updatedAt.toISOString(),
	}

	return (
		<div>
			<div className={s['admin-page-header']}>
				<Text type="expressive-headline" size="h3" tag="h1" color="brand">
					User Details
				</Text>
			</div>
			<UserDetail userId={userId} currentUserRole={currentUserRole} initialUser={initialUser} />
		</div>
	)
}
