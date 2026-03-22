import { requireAdmin } from '@/lib/auth/require-auth'
import { DashboardContent } from './dashboard-content'

export default async function DashboardPage() {
	await requireAdmin('/dashboard')

	return <DashboardContent />
}
