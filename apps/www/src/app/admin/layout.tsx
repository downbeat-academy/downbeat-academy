import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { HeaderNavigation } from '@components/navigation'
import { ContentWrapper, Content } from '@components/content-wrapper'
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
	const session = await requireAdmin('/admin')

	return (
		<>
			<HeaderNavigation initialSession={session} />
			<ContentWrapper>
				<Content isFullBleed>
					<AdminShell>{children}</AdminShell>
				</Content>
			</ContentWrapper>
		</>
	)
}
