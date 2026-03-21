'use client'

import { Suspense, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { authClient } from '@/lib/auth/auth-client'

function SignInRedirect() {
	const searchParams = useSearchParams()
	const callbackURL = searchParams.get('callbackURL') || '/dashboard'

	useEffect(() => {
		authClient.signIn.oauth2({
			providerId: 'downbeat-auth',
			callbackURL,
		})
	}, [callbackURL])

	return <p>Redirecting to sign in...</p>
}

export default function SignInPage() {
	return (
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
			<Suspense fallback={<p>Loading...</p>}>
				<SignInRedirect />
			</Suspense>
		</div>
	)
}
