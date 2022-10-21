import type { AppProps } from 'next/app'
import '@downbeat-academy/cadence-core/dist/style.css'
import '../styles/global.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
