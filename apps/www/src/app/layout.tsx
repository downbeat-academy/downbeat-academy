import { NuqsAdapter } from 'nuqs/adapters/next/app'
import Fathom from '@lib/fathom'
import { AppFrame } from '@components/app-frame'
import { Provider } from './provider'
import { isAdmin } from 'auth-permissions'
import { getOptionalSession } from '@/lib/auth/require-auth'
import { PostHogIdentify } from '@components/posthog-identify/posthog-identify'
import '@styles/index.css'

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await getOptionalSession()

	return (
		<html lang="en">
			<body>
				<Provider>
					<NuqsAdapter>
						<AppFrame>{children}</AppFrame>
					</NuqsAdapter>
				</Provider>
				<Fathom />
				{session?.user && (
					<PostHogIdentify
						userId={session.user.id}
						name={session.user.name}
						email={session.user.email}
						role={(session.user as { role?: string }).role}
						isAdmin={isAdmin(session)}
					/>
				)}
			</body>
		</html>
	)
}
