'use client'

import { useState, useTransition } from 'react'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	Field,
	Label,
	RadioGroup,
	Radio,
	Button,
	Text,
	toast,
} from 'cadence-core'
import { setRole } from '@/actions/admin/set-role'
import type { Role } from '@/lib/auth/permissions'
import s from './role-change-dialog.module.css'

type Props = {
	open: boolean
	onOpenChange: (open: boolean) => void
	userId: string
	userLabel: string
	currentRole: string | null
}

const ROLE_OPTIONS: Array<{ value: Role; label: string }> = [
	{ value: 'student', label: 'Student' },
	{ value: 'educator', label: 'Educator' },
	{ value: 'admin', label: 'Admin' },
	{ value: 'superAdmin', label: 'Super Admin' },
]

export function RoleChangeDialog({
	open,
	onOpenChange,
	userId,
	userLabel,
	currentRole,
}: Props) {
	const [selected, setSelected] = useState<Role>((currentRole as Role) || 'student')
	const [isPending, startTransition] = useTransition()

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		startTransition(async () => {
			const result = await setRole({ userId, role: selected })
			if (result.ok) {
				toast({ title: 'Role updated', description: userLabel, variant: 'success' })
				onOpenChange(false)
			} else {
				toast({ title: 'Role change failed', description: result.error, variant: 'error' })
			}
		})
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<form onSubmit={handleSubmit}>
					<DialogHeader>
						<DialogTitle>Change role</DialogTitle>
						<DialogDescription>
							Update role for{' '}
							<Text tag="span" collapse type="productive-body" size="body-base" color="strong">
								{userLabel}
							</Text>
							.
						</DialogDescription>
					</DialogHeader>
					<Field>
						<Label>Role</Label>
						<RadioGroup value={selected} onValueChange={(v) => setSelected(v as Role)}>
							{ROLE_OPTIONS.map((opt) => (
								<label key={opt.value} htmlFor={`role-${opt.value}`} className={s.option}>
									<Radio value={opt.value} id={`role-${opt.value}`} />
									<span>{opt.label}</span>
								</label>
							))}
						</RadioGroup>
					</Field>
					<DialogFooter>
						<Button
							type="button"
							variant="secondary"
							onClick={() => onOpenChange(false)}
							disabled={isPending}
						>
							Cancel
						</Button>
						<Button type="submit" disabled={isPending || selected === currentRole}>
							{isPending ? 'Saving…' : 'Save'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
