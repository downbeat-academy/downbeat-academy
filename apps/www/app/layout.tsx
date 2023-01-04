// import type { AppProps } from 'next/app'
import { useFathom } from '@hooks/useFathom'

interface AppProps {
  children: any,
}

export default function App({ children }: AppProps) {
  // useFathom()

  return (
    <html lang='en'>
      <body>
        {/* <Component {...pageProps} /> */}
        {children}
      </body>
    </html>
  )
}