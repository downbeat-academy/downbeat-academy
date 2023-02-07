import { useFathom } from '@hooks/useFathom'
import { Footer, Header } from '@components/navigation'
import { AppWrapper } from '@components/layout'
import '@styles/index.scss'

function CustomApp({ Component, pageProps }) {
	useFathom()

	return (
		<AppWrapper>
			<Header />
			<Component {...pageProps} />
			<Footer />
		</AppWrapper>
	)
}

export default CustomApp
