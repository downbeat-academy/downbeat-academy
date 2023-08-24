import { AppFrame } from '@components/appframe'
import { Footer, HeaderNavigation } from '@components/navigation'
import { ContentWrapper, Content } from '@components/content-wrapper'
import '@styles/index.scss'

import { Button } from './components/button'
import { Text } from './components/text'
import { Flex } from './components/layout'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AppFrame>
          <HeaderNavigation />
          <ContentWrapper>
            <Content isFullBleed>
              {/* {children} */}
            </Content>
          </ContentWrapper>
          <Footer />
        </AppFrame>
      </body>
    </html>
  )
}
