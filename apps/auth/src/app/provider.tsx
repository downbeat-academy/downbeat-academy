'use client'

import { Toaster, TooltipProvider } from 'cadence-core'

const Provider = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<TooltipProvider delayDuration={500}>
				{children}
				<Toaster />
			</TooltipProvider>
		</>
	)
}

export { Provider }
