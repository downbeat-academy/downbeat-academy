import { AppFrame } from '@components/appframe'
import { Footer, MainNavigation } from '@components/navigation'
import { Sidebar } from '@components/sidebar'
import { ContentWrapper, Content } from '@components/content-wrapper'
import { Button } from '@components/button'
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
              <Button
                text='Medium button'
                size='medium'
                variant='primary'
              />
              <Button
                text='Button as link'
                size='medium'
                variant='primary'
                href="https://google.com"
              />
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
