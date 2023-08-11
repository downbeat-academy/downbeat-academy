import { Appframe } from '@components/appframe'
import { Footer, MainNavigation } from '@components/navigation'
import { Sidebar } from '@components/sidebar'
import { ContentWrapper } from '@components/content-wrapper'
import '@styles/index.scss'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Appframe>
          <MainNavigation />
          <Sidebar position='start' />
          <ContentWrapper>
            {children}
          </ContentWrapper>
          <Footer />
        </Appframe>
      </body>
    </html>
  )
}
