import type { AppProps } from 'next/app'
import { useFathom } from '@hooks/useFathom'

export default function App({ Component, pageProps }: AppProps) {
	useFathom()
	return <Component {...pageProps} />
}
