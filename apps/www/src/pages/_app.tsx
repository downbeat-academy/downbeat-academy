import { useFathom } from '@hooks/useFathom'
import { Footer, Header } from '@components/navigation'
import '@styles/index.scss'

function CustomApp({ Component, pageProps }) {
	useFathom()

	return (
		<>
			<Header />
			<Component {...pageProps} />
			<Footer />
		</>
	)
}

export default CustomApp
