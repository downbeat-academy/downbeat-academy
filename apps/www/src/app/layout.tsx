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
          <MainNavigation />
          {/* <Sidebar position='start' /> */}
          <ContentWrapper className='custom-class'>
            {children}
          </ContentWrapper>
          <Footer />
        </AppFrame>
      </body>
    </html>
  )
}
