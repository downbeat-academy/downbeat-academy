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
import { Logs, Playlist, Headpones } from 'cadence-icons'

type NavItem = {
	href: string
	label: string
	exact?: boolean
	icon: React.ReactNode
}

// NOTE: icons are placeholders — cadence-icons is currently music-focused and
// lacks admin-flavored glyphs. Swap once a proper icon set lands.
const NAV_ITEMS: NavItem[] = [
	{ href: '/admin', label: 'Overview', exact: true, icon: <Logs /> },
	{ href: '/admin/users', label: 'Users', icon: <Playlist /> },
	{ href: '/admin/subscribers', label: 'Subscribers', icon: <Headpones /> },
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
