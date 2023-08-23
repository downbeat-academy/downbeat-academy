import Link from 'next/link'
import { AppFrame } from '@components/appframe'
import { Footer, MainNavigation } from '@components/navigation'
import { Sidebar } from '@components/sidebar'
import { ContentWrapper, Content } from '@components/content-wrapper'
import '@styles/index.scss'

import { Button, ButtonWrapper } from '@components/button'

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
              <ButtonWrapper>
                <Button
                  text='Primary button'
                  variant='primary'
                  size='medium'
                />
                <Button
                  text='Secondary button'
                  variant='secondary'
                  size='medium'
                />
              </ButtonWrapper>
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
