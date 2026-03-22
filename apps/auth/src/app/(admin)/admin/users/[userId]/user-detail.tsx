'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Text, Badge, DataTable, createTextColumn, createActionsColumn } from 'cadence-core'
import { authClient } from '@/lib/auth/auth-client'
import { ROLES, type Role } from 'auth-permissions'
import s from '../../../admin.module.css'

interface UserDetailProps {
	userId: string
	currentUserRole?: string
}

interface UserData {
	id: string
	name: string
	email: string
	role: string | null
	banned: boolean | null
	banReason: string | null
	banExpires: string | null
	emailVerified: boolean
	image: string | null
	createdAt: string
	updatedAt: string
}

interface SessionRow {
	id: string
	token: string
	userAgent: string | null
	ipAddress: string | null
	createdAt: string
	expiresAt: string
}

const roleBadgeType: Record<string, 'neutral' | 'info' | 'success' | 'highlight' | 'warning' | 'error'> = {
	student: 'neutral',
	educator: 'info',
	admin: 'warning',
	superAdmin: 'error',
}

export function UserDetail({ userId, currentUserRole }: UserDetailProps) {
	const router = useRouter()
	const [user, setUser] = useState<UserData | null>(null)
	const [sessions, setSessions] = useState<SessionRow[]>([])
	const [loading, setLoading] = useState(true)
	const [actionLoading, setActionLoading] = useState(false)
	const isSuperAdmin = currentUserRole === 'superAdmin'

	const fetchUser = useCallback(async () => {
		setLoading(true)
		try {
			const response = await authClient.admin.listUsers({
				query: { searchValue: userId, searchField: 'id' as any, searchOperator: 'eq' as any, limit: 1 },
			})
			if (response.data?.users?.[0]) {
				const u = response.data.users[0] as any
				setUser({
					id: u.id,
					name: u.name,
					email: u.email,
					role: u.role,
					banned: u.banned,
					banReason: u.banReason,
					banExpires: u.banExpires,
					emailVerified: u.emailVerified,
					image: u.image,
					createdAt: new Date(u.createdAt).toLocaleString(),
					updatedAt: new Date(u.updatedAt).toLocaleString(),
				})
			}

			const sessionsResponse = await authClient.admin.listUserSessions({
				userId,
			})
			if (sessionsResponse.data) {
				setSessions(
					(sessionsResponse.data as any).sessions?.map((s: any) => ({
						id: s.id,
						token: s.token?.slice(0, 12) + '...',
						userAgent: s.userAgent,
						ipAddress: s.ipAddress,
						createdAt: new Date(s.createdAt).toLocaleString(),
						expiresAt: new Date(s.expiresAt).toLocaleString(),
					})) ?? []
				)
			}
		} catch (err) {
			console.error('Failed to fetch user:', err)
		} finally {
			setLoading(false)
		}
	}, [userId])

	useEffect(() => {
		fetchUser()
	}, [fetchUser])

	const handleSetRole = async (newRole: string) => {
		setActionLoading(true)
		try {
			await authClient.admin.setRole({
				userId,
				role: newRole as Role,
			})
			await fetchUser()
		} catch (err) {
			console.error('Failed to set role:', err)
		} finally {
			setActionLoading(false)
		}
	}

	const handleBan = async () => {
		if (!confirm('Are you sure you want to ban this user?')) return
		setActionLoading(true)
		try {
			await authClient.admin.banUser({ userId })
			await fetchUser()
		} catch (err) {
			console.error('Failed to ban user:', err)
		} finally {
			setActionLoading(false)
		}
	}

	const handleUnban = async () => {
		setActionLoading(true)
		try {
			await authClient.admin.unbanUser({ userId })
			await fetchUser()
		} catch (err) {
			console.error('Failed to unban user:', err)
		} finally {
			setActionLoading(false)
		}
	}

	const handleRevokeSession = async (sessionToken: string) => {
		setActionLoading(true)
		try {
			await authClient.admin.revokeUserSession({
				sessionToken,
			})
			await fetchUser()
		} catch (err) {
			console.error('Failed to revoke session:', err)
		} finally {
			setActionLoading(false)
		}
	}

	const handleDeleteUser = async () => {
		if (!confirm('Are you sure you want to permanently delete this user? This cannot be undone.')) return
		setActionLoading(true)
		try {
			await authClient.admin.removeUser({ userId })
			router.push('/admin/users')
		} catch (err) {
			console.error('Failed to delete user:', err)
			setActionLoading(false)
		}
	}

	if (loading) {
		return <Text type="productive-body" size="body-base" color="faint">Loading...</Text>
	}

	if (!user) {
		return <Text type="productive-body" size="body-base" color="faint">User not found.</Text>
	}

	const sessionColumns = [
		createTextColumn<SessionRow>('ipAddress', 'IP Address'),
		createTextColumn<SessionRow>('userAgent', 'User Agent'),
		createTextColumn<SessionRow>('createdAt', 'Created'),
		createTextColumn<SessionRow>('expiresAt', 'Expires'),
		createActionsColumn<SessionRow>('actions', (row) => (
			<button
				onClick={() => handleRevokeSession(row.token)}
				disabled={actionLoading}
				style={{
					background: 'none',
					border: '1px solid var(--cds-color-border-primary)',
					borderRadius: 'var(--cds-radii-soft)',
					padding: 'var(--cds-scale-2x-small) var(--cds-scale-small)',
					cursor: 'pointer',
					fontSize: 'var(--cds-font-size-body-small)',
				}}
			>
				Revoke
			</button>
		)),
	]

	// Determine which roles this admin can assign
	const assignableRoles = isSuperAdmin
		? ROLES
		: ROLES.filter((r) => r !== 'superAdmin')

	return (
		<div>
			<div className={s['admin-user-detail-header']}>
				<div>
					<Text type="expressive-headline" size="h4" tag="h2">
						{user.name}
					</Text>
					<Text type="productive-body" size="body-base" color="faint">{user.email}</Text>
				</div>
				<Badge
					type={roleBadgeType[user.role ?? ''] ?? 'neutral'}
					style="light"
					size="medium"
					text={user.role ?? 'unset'}
				/>
				<Badge
					type={user.banned ? 'error' : 'success'}
					style="light"
					size="medium"
					text={user.banned ? 'Banned' : 'Active'}
				/>
			</div>

			<div className={s['admin-user-detail-grid']}>
				<div className={s['admin-detail-section']}>
					<Text type="expressive-headline" size="h6" tag="h3" color="brand">
						Profile
					</Text>
					<div className={s['admin-detail-row']}>
						<Text type="productive-body" size="body-small" color="faint">ID</Text>
						<Text type="productive-body" size="body-small">{user.id}</Text>
					</div>
					<div className={s['admin-detail-row']}>
						<Text type="productive-body" size="body-small" color="faint">Email Verified</Text>
						<Badge
							type={user.emailVerified ? 'success' : 'warning'}
							style="outlined"
							size="small"
							text={user.emailVerified ? 'Yes' : 'No'}
						/>
					</div>
					<div className={s['admin-detail-row']}>
						<Text type="productive-body" size="body-small" color="faint">Created</Text>
						<Text type="productive-body" size="body-small">{user.createdAt}</Text>
					</div>
					<div className={s['admin-detail-row']}>
						<Text type="productive-body" size="body-small" color="faint">Updated</Text>
						<Text type="productive-body" size="body-small">{user.updatedAt}</Text>
					</div>
					{user.banned && user.banReason && (
						<div className={s['admin-detail-row']}>
							<Text type="productive-body" size="body-small" color="faint">Ban Reason</Text>
							<Text type="productive-body" size="body-small">{user.banReason}</Text>
						</div>
					)}
				</div>

				<div className={s['admin-detail-section']}>
					<Text type="expressive-headline" size="h6" tag="h3" color="brand">
						Actions
					</Text>

					<div className={s['admin-detail-row']}>
						<Text type="productive-body" size="body-small" color="faint">Role</Text>
						<select
							value={user.role ?? ''}
							onChange={(e) => handleSetRole(e.target.value)}
							disabled={actionLoading}
							style={{
								padding: 'var(--cds-scale-2x-small) var(--cds-scale-small)',
								borderRadius: 'var(--cds-radii-soft)',
								border: '1px solid var(--cds-color-border-primary)',
								fontSize: 'var(--cds-font-size-body-small)',
							}}
						>
							{assignableRoles.map((role) => (
								<option key={role} value={role}>
									{role}
								</option>
							))}
						</select>
					</div>

					<div className={s['admin-detail-row']}>
						<Text type="productive-body" size="body-small" color="faint">
							{user.banned ? 'Unban User' : 'Ban User'}
						</Text>
						<button
							onClick={user.banned ? handleUnban : handleBan}
							disabled={actionLoading}
							style={{
								background: user.banned ? 'var(--cds-color-surface-primary)' : 'var(--cds-color-status-error)',
								color: user.banned ? 'var(--cds-color-text-primary)' : 'white',
								border: '1px solid var(--cds-color-border-primary)',
								borderRadius: 'var(--cds-radii-soft)',
								padding: 'var(--cds-scale-2x-small) var(--cds-scale-base)',
								cursor: 'pointer',
								fontSize: 'var(--cds-font-size-body-small)',
							}}
						>
							{user.banned ? 'Unban' : 'Ban'}
						</button>
					</div>

					{isSuperAdmin && (
						<div className={s['admin-detail-row']}>
							<Text type="productive-body" size="body-small" color="faint">Delete User</Text>
							<button
								onClick={handleDeleteUser}
								disabled={actionLoading}
								style={{
									background: 'var(--cds-color-status-error)',
									color: 'white',
									border: 'none',
									borderRadius: 'var(--cds-radii-soft)',
									padding: 'var(--cds-scale-2x-small) var(--cds-scale-base)',
									cursor: 'pointer',
									fontSize: 'var(--cds-font-size-body-small)',
								}}
							>
								Delete Permanently
							</button>
						</div>
					)}
				</div>
			</div>

			<div className={s['admin-section']} style={{ marginTop: 'var(--cds-scale-2x-large)' }}>
				<Text type="expressive-headline" size="h5" tag="h3" color="brand">
					Active Sessions ({sessions.length})
				</Text>
				<div style={{ marginTop: 'var(--cds-scale-base)' }}>
					<DataTable
						data={sessions}
						columns={sessionColumns}
						contained
						isStriped
						caption="User sessions"
						emptyState={{
							title: 'No active sessions',
							description: 'This user has no active sessions.',
						}}
					/>
				</div>
			</div>
		</div>
	)
}
