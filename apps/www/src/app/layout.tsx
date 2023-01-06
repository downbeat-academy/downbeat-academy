import Analytics from "@hooks/useFathom"
import { Footer } from '@components/navigation'
import '@styles/index.scss'

interface AppLayoutProps {
  children: React.ReactNode,
}

export default function App({ children }: AppLayoutProps) {

  return (
    <html lang='en'>
      <body>
        {children}
        <Footer />
      </body>
      <Analytics />
    </html>
  )
}