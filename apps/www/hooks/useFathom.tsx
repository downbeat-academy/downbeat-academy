import * as Fathom from 'fathom-client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const useFathom = () => {
	const router = useRouter();

	useEffect(() => {
		if (process.env.NODE_ENV === "production") {
			Fathom.load(process.env.NEXT_PUBLIC_FATHOM_ID, {
				includedDomains: ["downbeatacademy.com"],
			});
		}

		function onRouteChangeComplete() {
			Fathom.trackPageview();
		}

		router.events.on("routeChangeComplete", onRouteChangeComplete);

		return () => {
			router.events.off("routeChangeComplete", onRouteChangeComplete);
		};
	}, [router.events]);
};

export { useFathom }