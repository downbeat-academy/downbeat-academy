'use client'

import { useState } from 'react'
import {
	Button,
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	toast,
} from 'cadence-core'
import type { UserRow } from '@/lib/admin/types'
import { unbanUser } from '@/actions/admin/unban-user'
import { BanUserDialog } from './ban-user-dialog'
import { RoleChangeDialog } from './role-change-dialog'
import { RevokeSessionsDialog } from './revoke-sessions-dialog'

type Props = {
	user: UserRow
	isSelf: boolean
}

type OpenDialog = 'ban' | 'role' | 'revoke' | null

export function UserActionsMenu({ user, isSelf }: Props) {
	const [open, setOpen] = useState<OpenDialog>(null)
	const userLabel = user.name || user.email

	async function handleUnban() {
		const result = await unbanUser({ userId: user.id })
		if (result.ok) {
			toast({ title: 'User unbanned', description: userLabel, variant: 'success' })
		} else {
			toast({ title: 'Unban failed', description: result.error, variant: 'error' })
		}
	}

	async function handleCopyId() {
		await navigator.clipboard.writeText(user.id)
		toast({ title: 'User ID copied', description: user.id, variant: 'default' })
	}

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="small" disabled={isSelf}>
						Actions
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem onSelect={() => setOpen('role')}>Change role</DropdownMenuItem>
					{user.banned ? (
						<DropdownMenuItem onSelect={handleUnban}>Unban user</DropdownMenuItem>
					) : (
						<DropdownMenuItem onSelect={() => setOpen('ban')}>Ban user</DropdownMenuItem>
					)}
					<DropdownMenuItem onSelect={() => setOpen('revoke')}>
						Revoke all sessions
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem onSelect={handleCopyId}>Copy user ID</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<BanUserDialog
				open={open === 'ban'}
				onOpenChange={(v) => setOpen(v ? 'ban' : null)}
				userId={user.id}
				userLabel={userLabel}
			/>
			<RoleChangeDialog
				open={open === 'role'}
				onOpenChange={(v) => setOpen(v ? 'role' : null)}
				userId={user.id}
				userLabel={userLabel}
				currentRole={typeof user.role === 'string' ? user.role : null}
			/>
			<RevokeSessionsDialog
				open={open === 'revoke'}
				onOpenChange={(v) => setOpen(v ? 'revoke' : null)}
				userId={user.id}
				userLabel={userLabel}
			/>
		</>
	)
}
