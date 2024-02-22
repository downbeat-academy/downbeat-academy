import { ContentWrapper, Content } from '@components/content-wrapper'

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<ContentWrapper>
			<Content isFullBleed>{children}</Content>
		</ContentWrapper>
	)
}
