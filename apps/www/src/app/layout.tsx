import Fathom from '@lib/fathom'
import { AppFrame } from '@components/app-frame'
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
        <Fathom />
        <AppFrame>
          {children}
        </AppFrame>
      </body>
    </html>
  )
}
