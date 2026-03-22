'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { authClient } from '@/lib/auth/auth-client'
import classnames from 'classnames'
import { mainNavQuery, bannerQuery } from '@lib/queries'
import { sanityClient } from '@lib/sanity/sanity.client'
import s from './header-navigation.module.css'
import { Text, LogoLockup, Banner, BannerActions, BannerContent } from 'cadence-core'
import { Button } from '@components/ui/button'
import { NavContent } from './nav-content'
import { signOut } from '@/actions/auth'
import { useFormStatus } from 'react-dom'
import Link from 'next/link'

import type { HeaderNavigationProps } from './types'

// Fetch the data for the navigation
async function getNavigationData() {
	const client = sanityClient
	const res = client.fetch(mainNavQuery)

	if (!res) {
		throw new Error('Failed to fetch the main navigation data.')
	}

	return res
}

async function getBannerData() {
	const client = sanityClient
	const res = client.fetch(bannerQuery)

	if (!res) {
		throw new Error('Failed to fetch the banner data.')
	}

	return res
}

// Client component for the sign-out button with pending state
function SignOutButton({ className }: { className?: string }) {
	const { pending } = useFormStatus()

	return (
		<Button
			type="submit"
			data-testid="logout-button"
			variant="ghost"
			size="small"
			className={className}
			disabled={pending}
		>
			{pending ? "Signing out..." : "Sign Out"}
		</Button>
	)
}

// Render the component
const HeaderNavigation = ({ className, initialSession }: HeaderNavigationProps) => {
	const pathname = usePathname()
	const { data: clientSession, isPending } = authClient.useSession()
	const [navData, setNavData] = useState<any>(null)
	const [bannerData, setBannerData] = useState<any>(null)
	const [error, setError] = useState<Error | null>(null)

	// Use the server-provided session immediately, then swap to client session
	// once resolved. This eliminates flash — we always have a definitive state.
	const session = isPending ? initialSession : (clientSession ?? initialSession)
	const isAuthenticated = !!session?.session

	// Build sign-in URL once, shared by banner and nav
	const signInHref = `/sign-in?callbackURL=${encodeURIComponent(pathname)}`

	const handleSignOut = async () => {
		try {
			// Clear local session
			await authClient.signOut()
			// Redirect to auth service end-session to clear the auth session too,
			// then redirect back to the home page
			const authServiceUrl = process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || 'http://localhost:3002'
			const appUrl = process.env.NEXT_PUBLIC_PROJECT_URL || 'http://localhost:3000'
			window.location.href = `${authServiceUrl}/api/auth/oauth2/end-session?post_logout_redirect_uri=${encodeURIComponent(appUrl)}`
		} catch (error) {
			// Fallback to server action
			await signOut()
		}
	}

	useEffect(() => {
		const initData = async () => {
			try {
				const [nav, banner] = await Promise.all([
					getNavigationData().catch(error => {
						console.error('Failed to fetch navigation data:', error)
						return null
					}),
					getBannerData().catch(error => {
						console.error('Failed to fetch banner data:', error)
						return null
					})
				])
				setNavData(nav)
				setBannerData(banner)
			} catch (error) {
				console.error('Failed to initialize data:', error)
				setError(error as Error)
			}
		}

		initData()
	}, [])

	const classes = classnames(s.root, [className])

	// If there's an error loading the navigation, render a minimal header
	if (error) {
		return (
			<header className={classes}>
				<div className={s.logo}>
					<Link href="/">
						<LogoLockup width={180} color='brand' />
					</Link>
				</div>
			</header>
		)
	}

	return (
		<header className={classes}>
			<Banner type="primary">
				<BannerContent>
					{bannerData && (
						<Text
							tag="p"
							color="high-contrast"
							type="productive-body"
							size="body-small"
							collapse
						>
							{bannerData.headline}
						</Text>
					)}
				</BannerContent>
				<BannerActions>
					{!isAuthenticated ? (
						<Button
							data-testid="sign-in-link"
							variant="primary"
							size="small"
							href={signInHref}
						>
							Sign in / Sign up
						</Button>
					) : (
						<>
							<form action={handleSignOut} data-testid="user-menu">
								<SignOutButton className={s['sign-out-button']} />
							</form>
							<Button
								data-testid="account-link"
								size="small"
								variant="primary"
								href="/account"
							>
								Account
							</Button>
						</>
					)}
				</BannerActions>
			</Banner>
			{navData && (
				<NavContent
					links={navData}
					isAuthenticated={isAuthenticated}
					signInHref={signInHref}
					onSignOut={handleSignOut}
				/>
			)}
		</header>
	)
}

export { HeaderNavigation }
