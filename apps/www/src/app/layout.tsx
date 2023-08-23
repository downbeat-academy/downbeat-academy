import { AppFrame } from '@components/appframe'
import { Footer, HeaderNavigation } from '@components/navigation'
import { ContentWrapper, Content } from '@components/content-wrapper'
import '@styles/index.scss'

import { Text } from '@components/text'

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
              <Text tag='h1' color='brand' type='expressive-headline' size='mega' collapse>Mega headline</Text>
              <Text tag='h1' color='brand' type='expressive-headline' size='h1' collapse>Headline 1</Text>
              <Text tag='h2' color='brand' type='expressive-headline' size='h2' collapse>Headline 2</Text>
              <Text tag='h3' color='brand' type='expressive-headline' size='h3' collapse>Headline 3</Text>
              <Text tag='h4' color='brand' type='expressive-headline' size='h4' collapse>Headline 4</Text>
              <Text tag='h5' color='brand' type='expressive-headline' size='h5' collapse>Headline 5</Text>
              <Text tag='h6' color='brand' type='expressive-headline' size='h6' collapse>Headline 6</Text>
              <Text tag='p' color='primary' type='expressive-body' size='body-large'>Lorem ipsum dolor sit amet.</Text>
              <Text tag='p' color='primary' type='expressive-body' size='body-base'>Lorem ipsum dolor sit amet.</Text>
              <Text tag='p' color='primary' type='expressive-body' size='body-small'>Lorem ipsum dolor sit amet.</Text>
              <Text tag='p' color='primary' type='expressive-body' size='body-x-small'>Lorem ipsum dolor sit amet.</Text>
            </Content>
          </ContentWrapper>
          <Footer />
        </AppFrame>
      </body>
    </html>
  )
}
