'use client'

import { useId, useState, useTransition } from 'react'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	Field,
	Label,
	Input,
	HelperText,
	ValidationMessage,
	Button,
	Text,
	toast,
} from 'cadence-core'
import { removeUser } from '@/actions/admin/remove-user'

type Props = {
	open: boolean
	onOpenChange: (open: boolean) => void
	userId: string
	userLabel: string
	userEmail: string
}

export function DeleteUserDialog({ open, onOpenChange, userId, userLabel, userEmail }: Props) {
	const inputId = useId()
	const helperId = `${inputId}-helper`
	const errorId = `${inputId}-error`
	const [confirmation, setConfirmation] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [isPending, startTransition] = useTransition()

	const confirmed = confirmation.trim().toLowerCase() === userEmail.toLowerCase()

	function handleOpenChange(next: boolean) {
		// Escape and the backdrop still dismiss while the request is in flight; ignore
		// them so the outcome is shown instead of landing on a closed dialog.
		if (!next && isPending) return
		if (!next) {
			setConfirmation('')
			setError(null)
		}
		onOpenChange(next)
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		if (!confirmed) return
		setError(null)
		startTransition(async () => {
			const result = await removeUser({ userId })
			if (result.ok) {
				// Safe to toast here: the dialog closes first, so it is not painted behind it.
				setConfirmation('')
				onOpenChange(false)
				toast({ title: 'User deleted', description: userLabel, variant: 'success' })
			} else {
				// Reported inline rather than through a toast: a toast raised from an open
				// modal is painted behind it (docs/adr/0002-known-gaps.md).
				setError(result.error ?? 'Delete failed')
			}
		})
	}

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogContent>
				<form onSubmit={handleSubmit}>
					<DialogHeader>
						<DialogTitle>Delete user permanently?</DialogTitle>
						<DialogDescription>
							This deletes{' '}
							<Text tag="span" collapse type="productive-body" size="body-base" color="strong">
								{userLabel}
							</Text>
							, their sessions, linked accounts, and analytics history. It cannot be undone. To
							block access but keep the account, ban the user instead.
						</DialogDescription>
					</DialogHeader>
					<Field>
						<Label htmlFor={inputId}>Type the user’s email to confirm</Label>
						<Input
							id={inputId}
							type="email"
							name="confirmEmail"
							value={confirmation}
							onChange={(e) => setConfirmation(e.currentTarget.value)}
							placeholder={userEmail}
							autoComplete="off"
							disabled={isPending}
							aria-invalid={error ? true : undefined}
							aria-describedby={error ? `${helperId} ${errorId}` : helperId}
						/>
						<HelperText>
							<span id={helperId}>{userEmail}</span>
						</HelperText>
						{error && (
							<ValidationMessage type="error" role="alert" id={errorId}>
								{error}
							</ValidationMessage>
						)}
					</Field>
					<DialogFooter>
						<Button
							type="button"
							variant="secondary"
							onClick={() => handleOpenChange(false)}
							disabled={isPending}
						>
							Cancel
						</Button>
						<Button type="submit" variant="destructive" disabled={!confirmed || isPending}>
							{isPending ? 'Deleting…' : 'Delete user'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
