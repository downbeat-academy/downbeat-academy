import Fathom from '@lib/fathom'
import { AppFrame } from '@components/app-frame'
import { Provider } from './provider'
import '@styles/index.scss'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body>
				<Provider>
					<AppFrame>{children}</AppFrame>
				</Provider>
				<Fathom />
			</body>
		</html>
	)
}
