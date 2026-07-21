import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { requireAdmin } from '@/lib/auth/require-auth'
import { AdminShell } from './_components/admin-shell'

export const metadata: Metadata = {
	title: 'Admin — Downbeat Academy',
	robots: { index: false, follow: false },
}

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
}

export default async function AdminLayout({ children }: { children: ReactNode }) {
	await requireAdmin('/admin')

	return <AdminShell>{children}</AdminShell>
}
