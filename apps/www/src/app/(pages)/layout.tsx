import { Footer, HeaderNavigation } from '@components/navigation'
import { ContentWrapper, Content } from '@components/content-wrapper'

export default function PageLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<HeaderNavigation />
			<ContentWrapper>
				<Content isFullBleed>{children}</Content>
			</ContentWrapper>
			<Footer />
		</>
	)
}
