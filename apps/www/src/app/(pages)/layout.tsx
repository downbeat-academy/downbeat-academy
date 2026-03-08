import { Footer, HeaderNavigation } from '@components/navigation'
import { ContentWrapper, Content } from '@components/content-wrapper'
import { getOptionalSession } from '@/lib/auth/require-auth'

export default async function PageLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const session = await getOptionalSession()

	return (
		<>
			<HeaderNavigation initialSession={session} />
			<ContentWrapper>
				<Content isFullBleed>{children}</Content>
			</ContentWrapper>
			<Footer />
		</>
	)
}
