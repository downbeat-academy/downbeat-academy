import { AppFrame } from '@app/components/app-frame'
import { Footer, HeaderNavigation } from '@components/navigation'
import { ContentWrapper, Content } from '@components/content-wrapper'
import '@styles/index.scss'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AppFrame>
          {/* @ts-expect-error Server Component */}
          <HeaderNavigation />
          <ContentWrapper>
            <Content isFullBleed>
              {children}
            </Content>
          </ContentWrapper>
          <Footer />
        </AppFrame>
      </body>
    </html>
  )
}
