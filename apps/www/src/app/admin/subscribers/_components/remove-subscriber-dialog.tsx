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
import { removeSubscriber } from '@/actions/admin/remove-subscriber'

type Props = {
	open: boolean
	onOpenChange: (open: boolean) => void
	email: string
}

export function RemoveSubscriberDialog({ open, onOpenChange, email }: Props) {
	const [isPending, startTransition] = useTransition()

	function handleConfirm() {
		startTransition(async () => {
			const result = await removeSubscriber({ email })
			if (result.ok) {
				toast({ title: 'Subscriber removed', description: email, variant: 'success' })
				onOpenChange(false)
			} else {
				toast({ title: 'Remove failed', description: result.error, variant: 'error' })
			}
		})
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Remove subscriber?</DialogTitle>
					<DialogDescription>
						This will remove{' '}
						<Text tag="span" collapse type="productive-body" size="body-base" color="strong">
							{email}
						</Text>{' '}
						from the newsletter audience.
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
						{isPending ? 'Removing…' : 'Remove'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
