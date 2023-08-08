import { Footer, MainNavigation } from './components/navigation'
import '@styles/index.scss'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <MainNavigation />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
