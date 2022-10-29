import type { AppProps } from 'next/app';
import { MDXProvider } from '../lib/mdxProvider';
import '../styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<MDXProvider>
			<Component {...pageProps} />
		</MDXProvider>
	);
}

export default MyApp;
