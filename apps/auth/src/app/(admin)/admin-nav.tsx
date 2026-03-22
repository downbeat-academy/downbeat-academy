'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Text, Badge } from 'cadence-core'
import { authClient } from '@/lib/auth/auth-client'
import s from './admin.module.css'

interface AdminNavProps {
	session: {
		user: {
			name: string
			email: string
			role?: string
		}
	}
}

export function AdminNav({ session }: AdminNavProps) {
	const pathname = usePathname()

	const links = [
		{ href: '/admin', label: 'Dashboard' },
		{ href: '/admin/users', label: 'Users' },
		{ href: '/admin/sessions', label: 'Sessions' },
	]

	return (
		<nav className={s['admin-nav']}>
			<div className={s['admin-nav-header']}>
				<Text type="expressive-headline" size="h6" tag="div" color="brand">
					Admin
				</Text>
			</div>
			<ul className={s['admin-nav-links']}>
				{links.map((link) => (
					<li key={link.href}>
						<Link
							href={link.href}
							className={s['admin-nav-link']}
							style={pathname === link.href ? {
								background: 'var(--cds-color-surface-tertiary)',
								color: 'var(--cds-color-text-primary)',
								fontWeight: 500,
							} : undefined}
						>
							{link.label}
						</Link>
					</li>
				))}
			</ul>
			<div className={s['admin-nav-footer']}>
				<Text type="productive-body" size="body-small" color="faint">
					{session.user.name}
				</Text>
				<Badge type="neutral" style="outlined" size="small" text={session.user.role ?? 'unset'} />
			</div>
		</nav>
	)
}
