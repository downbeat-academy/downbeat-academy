'use client'

import { ThemeProvider } from 'next-themes'
import { Toaster, TooltipProvider } from 'cadence-core'

const Provider = ({ children }: { children: React.ReactNode }) => {
	return (
		<ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
			<TooltipProvider delayDuration={500}>
				{children}
				<Toaster />
			</TooltipProvider>
		</ThemeProvider>
	)
}

export { Provider }
