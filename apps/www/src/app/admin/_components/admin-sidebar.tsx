'use client'

import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import {
	Sidebar,
	SidebarHeader,
	SidebarSection,
	SidebarLink,
	SidebarToggle,
} from 'cadence-core'
import { Layout, UserPlus, MailPlus } from 'cadence-icons'

type NavItem = {
	href: string
	label: string
	exact?: boolean
	icon: React.ReactNode
}

const NAV_ITEMS: NavItem[] = [
	{ href: '/admin', label: 'Overview', exact: true, icon: <Layout /> },
	{ href: '/admin/users', label: 'Users', icon: <UserPlus /> },
	{ href: '/admin/subscribers', label: 'Subscribers', icon: <MailPlus /> },
]

function isActiveMatch(pathname: string, href: string, exact?: boolean) {
	if (exact) return pathname === href
	return pathname === href || pathname.startsWith(`${href}/`)
}

export function AdminSidebar({ className }: { className?: string }) {
	const pathname = usePathname()

	return (
		<Sidebar ariaLabel="Admin navigation" className={className}>
			<SidebarHeader>
				<SidebarToggle style={{ marginLeft: 'auto' }} />
			</SidebarHeader>
			<SidebarSection>
				{NAV_ITEMS.map((item) => (
					<SidebarLink
						key={item.href}
						asChild
						isActive={isActiveMatch(pathname, item.href, item.exact)}
						leadingIcon={item.icon}
					>
						<NextLink href={item.href}>{item.label}</NextLink>
					</SidebarLink>
				))}
			</SidebarSection>
		</Sidebar>
	)
}
