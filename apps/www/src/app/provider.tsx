'use client'

import { Toaster } from '@components/toast'
import { TooltipProvider } from '@components/tooltip'

const Provider = ({ children }) => {
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
