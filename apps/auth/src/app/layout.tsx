import { Provider } from './provider'
import '@/styles/index.css'

export const metadata = {
	title: 'Downbeat Academy Auth',
	description: 'Authentication for Downbeat Academy',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body>
				<Provider>
					{children}
				</Provider>
			</body>
		</html>
	)
}
