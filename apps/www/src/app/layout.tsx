import { AppFrame } from '@components/appframe'
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
        <AppFrame>
          <MainNavigation className='custom-class' />
          <Sidebar position='start' />
          <ContentWrapper>
            {children}
          </ContentWrapper>
          <Sidebar position='end' />
          <Footer />
        </AppFrame>
      </body>
    </html>
  )
}
