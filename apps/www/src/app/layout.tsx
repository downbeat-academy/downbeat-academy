import Link from 'next/link'
import { AppFrame } from '@components/appframe'
import { Footer, MainNavigation } from '@components/navigation'
import { Sidebar } from '@components/sidebar'
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
          <MainNavigation />
          <ContentWrapper>
            <Sidebar>
              <p>Left sidebar</p>
            </Sidebar>
            <Content>
              {children}
            </Content>
            <Sidebar>
              <p>Right sidebar</p>
            </Sidebar>
          </ContentWrapper>
          <Footer />
        </AppFrame>
      </body>
    </html>
  )
}
