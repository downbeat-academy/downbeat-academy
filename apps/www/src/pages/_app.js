import { useRouter } from 'next/router';
import { useEffect } from 'react';
import * as Fathom from 'fathom-client';
import { UserProvider } from '@auth0/nextjs-auth0'
import { globalStyles } from '@styles/globalStyles';
import { Header, Footer } from '@components/navigation';
import { styled, TooltipProvider } from 'cadence-design-system';

function CustomApp({ Component, pageProps }) {
	const router = useRouter();

	// Fathom Analytics
	useEffect(() => {
		// Initialize Fathom with the app loads

		Fathom.load('UPKSKXNN', {
			includedDomains: [
				'downbeatacademy.com',
				'www.downbeatacademy.com',
				'nextjs-frontend-dba.vercel.app',
			],
		});

		function onRouteChangeComplete() {
			Fathom.trackPageview();
		}

		// Record a pageview when the route changes
		router.events.on('routeChangeComplete', onRouteChangeComplete);

		// Unassign event listener
		return () => {
			router.events.off('routeChangeComplete', onRouteChangeComplete);
		};
	}, [router]);

	globalStyles();

	return (
		<UserProvider>
			<TooltipProvider delayDuration={200} skipDelayDuration={500}>
				<Header />
				<ContentArea>
					<Component {...pageProps} />
				</ContentArea>
				<Footer />
			</TooltipProvider>
		</UserProvider>
	);
}

export default CustomApp;

const ContentArea = styled('main', {
	minHeight: 'calc(100vh - 125px)',
});
