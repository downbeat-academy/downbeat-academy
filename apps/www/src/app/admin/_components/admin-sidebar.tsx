import { Flex, Text } from 'cadence-core'
import { SidebarNavLink } from './sidebar-nav-link'

const NAV_ITEMS = [
	{ href: '/admin', label: 'Overview', exact: true },
	{ href: '/admin/users', label: 'Users' },
	{ href: '/admin/subscribers', label: 'Subscribers' },
]

export function AdminSidebar() {
	return (
		<Flex direction="column" gap="large" padding="large" tag="nav">
			<Text type="expressive-headline" size="h6" color="brand" collapse>
				Admin
			</Text>
			<Flex direction="column" gap="2x-small">
				{NAV_ITEMS.map((item) => (
					<SidebarNavLink
						key={item.href}
						href={item.href}
						label={item.label}
						exact={item.exact}
					/>
				))}
			</Flex>
		</Flex>
	)
}
