import { NuqsAdapter } from 'nuqs/adapters/next/app'
import Fathom from '@lib/fathom'
import { AppFrame } from '@components/app-frame'
import { Provider } from './provider'
import './globals.css'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body>
				<Provider>
					<NuqsAdapter>
						<AppFrame>{children}</AppFrame>
					</NuqsAdapter>
				</Provider>
				<Fathom />
			</body>
		</html>
	)
}
