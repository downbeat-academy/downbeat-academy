'use client'

import { useState } from 'react'
import {
	Button,
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	toast,
} from 'cadence-core'
import { RemoveSubscriberDialog } from './remove-subscriber-dialog'

type Props = {
	email: string
}

export function SubscriberActionsMenu({ email }: Props) {
	const [openRemove, setOpenRemove] = useState(false)

	async function handleCopy() {
		await navigator.clipboard.writeText(email)
		toast({ title: 'Email copied', description: email, variant: 'default' })
	}

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="small">
						Actions
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem onSelect={handleCopy}>Copy email</DropdownMenuItem>
					<DropdownMenuItem onSelect={() => setOpenRemove(true)}>
						Remove from audience
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<RemoveSubscriberDialog open={openRemove} onOpenChange={setOpenRemove} email={email} />
		</>
	)
}
