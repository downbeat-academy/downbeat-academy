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
	Textarea,
	Select,
	Button,
	Text,
	toast,
} from 'cadence-core'
import { banUser } from '@/actions/admin/ban-user'

type Props = {
	open: boolean
	onOpenChange: (open: boolean) => void
	userId: string
	userLabel: string
}

const DURATION_OPTIONS = [
	{ value: '', label: 'Permanent' },
	{ value: String(60 * 60 * 24), label: '24 hours' },
	{ value: String(60 * 60 * 24 * 7), label: '7 days' },
	{ value: String(60 * 60 * 24 * 30), label: '30 days' },
]

export function BanUserDialog({ open, onOpenChange, userId, userLabel }: Props) {
	const [reason, setReason] = useState('')
	const [duration, setDuration] = useState('')
	const [isPending, startTransition] = useTransition()

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		startTransition(async () => {
			const result = await banUser({
				userId,
				banReason: reason || undefined,
				banExpiresIn: duration ? Number(duration) : undefined,
			})
			if (result.ok) {
				toast({ title: 'User banned', description: userLabel, variant: 'success' })
				onOpenChange(false)
				setReason('')
				setDuration('')
			} else {
				toast({ title: 'Ban failed', description: result.error, variant: 'error' })
			}
		})
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<form onSubmit={handleSubmit}>
					<DialogHeader>
						<DialogTitle>Ban user</DialogTitle>
						<DialogDescription>
							This will prevent{' '}
							<Text tag="span" collapse type="productive-body" size="body-base" color="strong">
								{userLabel}
							</Text>{' '}
							from signing in.
						</DialogDescription>
					</DialogHeader>
					<Field>
						<Label>Reason (optional)</Label>
						<Textarea
							name="banReason"
							value={reason}
							onChange={(e) => setReason(e.currentTarget.value)}
							placeholder="Shared with the user"
							rows={3}
						/>
					</Field>
					<Field>
						<Label>Duration</Label>
						<Select
							name="banExpiresIn"
							value={duration}
							onChange={(e) => setDuration(e.currentTarget.value)}
						>
							{DURATION_OPTIONS.map((opt) => (
								<option key={opt.label} value={opt.value}>
									{opt.label}
								</option>
							))}
						</Select>
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
						<Button type="submit" variant="destructive" disabled={isPending}>
							{isPending ? 'Banning…' : 'Ban user'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
