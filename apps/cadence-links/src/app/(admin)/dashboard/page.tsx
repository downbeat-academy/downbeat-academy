import { requireAuth } from '@/lib/auth/require-auth'
import { DashboardContent } from './dashboard-content'

export default async function DashboardPage() {
	await requireAuth('/dashboard')

	return <DashboardContent />
}
