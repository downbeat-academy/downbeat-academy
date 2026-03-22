import { Text } from 'cadence-core'
import { getOptionalSession } from '@/lib/auth/require-auth'
import { UserDetail } from './user-detail'
import s from '../../../admin.module.css'

interface UserDetailPageProps {
	params: Promise<{ userId: string }>
}

export default async function UserDetailPage({ params }: UserDetailPageProps) {
	const { userId } = await params
	const session = await getOptionalSession()
	const currentUserRole = session?.user?.role as string | undefined

	return (
		<div>
			<div className={s['admin-page-header']}>
				<Text type="expressive-headline" size="h3" tag="h1" color="brand">
					User Details
				</Text>
			</div>
			<UserDetail userId={userId} currentUserRole={currentUserRole} />
		</div>
	)
}
