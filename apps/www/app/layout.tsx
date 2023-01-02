import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useFathom } from '@hooks/useFathom'

export default function App({ Component, pageProps }: AppProps) {
  useFathom()

  return (
    <html lang='en'>
      <body>
        <Component {...pageProps} />
      </body>
    </html>
  )
}