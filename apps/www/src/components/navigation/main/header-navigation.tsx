'use client'

import { useEffect, useState } from 'react'
import { authClient } from '@/lib/auth/auth-client'
import classnames from 'classnames'
import { mainNavQuery, bannerQuery } from '@lib/queries'
import { sanityClient } from '@lib/sanity/sanity.client'
import s from './header-navigation.module.css'
import { Text, LogoLockup, Banner, BannerActions, BannerContent } from 'cadence-core'
import { Button } from '@components/ui/button'
import { NavContent } from './nav-content'
import { useRouter } from 'next/navigation'
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

// Create a client component for the sign-out button
function SignOutButton() {
	const { pending } = useFormStatus()
	
	return (
		<Button
			type="submit"
			data-testid="logout-button"
			variant="ghost"
			size="small"
			className={s['sign-out-button']}
			disabled={pending}
		>
			{pending ? "Signing out..." : "Sign Out"}
		</Button>
	)
}

// Render the component
const HeaderNavigation = ({ className }: HeaderNavigationProps) => {
	const [session, setSession] = useState<any>(null)
	const [navData, setNavData] = useState<any>(null)
	const [bannerData, setBannerData] = useState<any>(null)
	const [error, setError] = useState<Error | null>(null)
	const router = useRouter()

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

		// Check session when auth state changes
		const checkSession = async () => {
			try {
				const session = await authClient.getSession()
				setSession(session)
				router.refresh()
			} catch (error) {
				console.error('Failed to get session:', error)
				setSession(null)
			}
		}

		checkSession()

		// Listen for auth state changes
		window.addEventListener('auth-event', checkSession)
		return () => {
			window.removeEventListener('auth-event', checkSession)
		}
	}, [router])

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

	// If data is still loading, render a minimal header
	if (!navData || !bannerData) {
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

	const handleSignOut = async () => {
		try {
			// Update local session state immediately
			setSession(null)
			// Trigger the server action
			await signOut()
		} catch (error) {
			// If sign-out fails, recheck the session
			window.dispatchEvent(new Event('auth-event'))
		}
	}

	return (
		<header className={classes}>
			<Banner type="primary">
				<BannerContent>
					<Text
						tag="p"
						color="high-contrast"
						type="productive-body"
						size="body-small"
						collapse
					>
						{bannerData.headline}
					</Text>
				</BannerContent>
				<BannerActions>
					{!session?.data?.session ? (
						<>
							<Button
								data-testid="sign-in-link"
								variant="primary"
								size="small"
								href={`${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || 'http://localhost:3002'}/sign-in?redirect_uri=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '/')}`}
							>
								Sign in / Sign up
							</Button>
						</>
					) : (
						<>
							<form action={handleSignOut} data-testid="user-menu">
								<SignOutButton />
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
			<NavContent links={navData} session={session} />
		</header>
	)
}

export { HeaderNavigation }
