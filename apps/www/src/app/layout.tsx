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
              <Flex direction='row' alignItems='center'>
                <Text tag='h1' type='expressive-headline' size='h1' collapse>Headline</Text>
                <Text tag='p' type='expressive-body' size='body-base' collapse>Lorem ipsum dolor sit amet.</Text>
                <Button text='Button' variant='primary' size='medium' />
              </Flex>
              {/* {children} */}
            </Content>
          </ContentWrapper>
          <Footer />
        </AppFrame>
      </body>
    </html>
  )
}
