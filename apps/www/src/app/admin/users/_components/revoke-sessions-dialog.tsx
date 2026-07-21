'use client'

import { useTransition } from 'react'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	Button,
	Text,
	toast,
} from 'cadence-core'
import { revokeUserSessions } from '@/actions/admin/revoke-user-sessions'

type Props = {
	open: boolean
	onOpenChange: (open: boolean) => void
	userId: string
	userLabel: string
}

export function RevokeSessionsDialog({ open, onOpenChange, userId, userLabel }: Props) {
	const [isPending, startTransition] = useTransition()

	function handleConfirm() {
		startTransition(async () => {
			const result = await revokeUserSessions({ userId })
			if (result.ok) {
				toast({ title: 'Sessions revoked', description: userLabel, variant: 'success' })
				onOpenChange(false)
			} else {
				toast({ title: 'Revoke failed', description: result.error, variant: 'error' })
			}
		})
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Revoke all sessions?</DialogTitle>
					<DialogDescription>
						This will sign{' '}
						<Text tag="span" collapse type="productive-body" size="body-base" color="strong">
							{userLabel}
						</Text>{' '}
						out of every device. They can sign back in immediately.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button
						type="button"
						variant="secondary"
						onClick={() => onOpenChange(false)}
						disabled={isPending}
					>
						Cancel
					</Button>
					<Button
						type="button"
						variant="destructive"
						onClick={handleConfirm}
						disabled={isPending}
					>
						{isPending ? 'Revoking…' : 'Revoke sessions'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
