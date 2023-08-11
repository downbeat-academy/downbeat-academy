import { Appframe } from '@components/appframe'
import { Footer, MainNavigation } from '@components/navigation'
import '@styles/index.scss'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Appframe
          sidebarLeft='Left sidebar'
          sidebarRight='Right sidebar'
          header='Header'
          footer='Footer'
        >
          {children}
        </Appframe>
        {/* <MainNavigation />
        <main>
          {children}
        </main>
        <Footer /> */}
      </body>
    </html>
  )
}
