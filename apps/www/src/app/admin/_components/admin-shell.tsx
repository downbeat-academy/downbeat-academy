import type { ReactNode } from 'react'
import { AdminSidebar } from './admin-sidebar'
import s from './admin-shell.module.css'

export function AdminShell({ children }: { children: ReactNode }) {
	return (
		<div className={s.root}>
			<aside className={s.sidebar}>
				<AdminSidebar />
			</aside>
			<div className={s.main}>{children}</div>
		</div>
	)
}
