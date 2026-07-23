'use client'

import { useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Field, Input, Label, Select } from 'cadence-core'
import s from './users-filter-bar.module.css'

type Props = {
	initialQuery: string
	initialRole: string
	initialStatus: string
}

export function UsersFilterBar({ initialQuery, initialRole, initialStatus }: Props) {
	const router = useRouter()
	const searchParams = useSearchParams()
	const [isPending, startTransition] = useTransition()

	function update(patch: Record<string, string | undefined>) {
		const params = new URLSearchParams(searchParams.toString())
		for (const [key, value] of Object.entries(patch)) {
			if (value === undefined || value === '' || value === 'all') {
				params.delete(key)
			} else {
				params.set(key, value)
			}
		}
		params.delete('page')
		const qs = params.toString()
		startTransition(() => {
			router.push(qs ? `/admin/users?${qs}` : '/admin/users')
		})
	}

	return (
		<div className={s.root} data-pending={isPending}>
			<Field>
				<Label>Search</Label>
				<Input
					name="q"
					type="text"
					placeholder="Name or email"
					defaultValue={initialQuery}
					onChange={(e) => {
						const value = e.currentTarget.value
						update({ q: value })
					}}
				/>
			</Field>
			<Field>
				<Label>Role</Label>
				<Select
					name="role"
					defaultValue={initialRole}
					onChange={(e) => update({ role: e.currentTarget.value })}
				>
					<option value="all">All roles</option>
					<option value="student">Student</option>
					<option value="educator">Educator</option>
					<option value="admin">Admin</option>
					<option value="superAdmin">Super Admin</option>
				</Select>
			</Field>
			<Field>
				<Label>Status</Label>
				<Select
					name="status"
					defaultValue={initialStatus}
					onChange={(e) => update({ status: e.currentTarget.value })}
				>
					<option value="all">All statuses</option>
					<option value="active">Active</option>
					<option value="banned">Banned</option>
					<option value="unverified">Unverified</option>
				</Select>
			</Field>
		</div>
	)
}
