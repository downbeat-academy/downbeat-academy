'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import classnames from 'classnames'
import s from './sidebar-nav-link.module.css'

type SidebarNavLinkProps = {
	href: string
	label: string
	exact?: boolean
}

export function SidebarNavLink({ href, label, exact = false }: SidebarNavLinkProps) {
	const pathname = usePathname()
	const isActive = exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`)

	return (
		<Link href={href} className={classnames(s.link, isActive && s.active)}>
			{label}
		</Link>
	)
}
