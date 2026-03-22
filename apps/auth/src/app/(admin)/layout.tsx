import { requireAdmin } from '@/lib/auth/require-auth'
import { AdminNav } from './admin-nav'
import s from './admin.module.css'

export const metadata = {
	title: 'Admin - Downbeat Academy',
	description: 'Admin dashboard for Downbeat Academy',
}

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await requireAdmin('/admin')

	return (
		<div className={s['admin-layout']}>
			<AdminNav session={session} />
			<main className={s['admin-main']}>
				{children}
			</main>
		</div>
	)
}
