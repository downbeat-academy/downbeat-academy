'use client'

import { useEffect, useState } from 'react'
import { authClient } from '@/lib/auth/auth-client'
import classnames from 'classnames'
import { mainNavQuery, bannerQuery } from '@lib/queries'
import { sanityClient } from '@lib/sanity/sanity.client'
import s from './header-navigation.module.scss'
import * as Banner from '@components/banner'
import { Text } from 'cadence-core'
import { Button } from '@components/button'
import { NavContent } from './nav-content'
import { useRouter } from 'next/navigation'

import type { HeaderNavigationProps } from './types'
import SignOut from '@app/(auth)/sign-in/sign-out'

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

// Render the component
const HeaderNavigation = ({ className }: HeaderNavigationProps) => {
	const [session, setSession] = useState<any>(null)
	const [navData, setNavData] = useState<any>(null)
	const [bannerData, setBannerData] = useState<any>(null)
	const router = useRouter()

	useEffect(() => {
		const initData = async () => {
			const [nav, banner] = await Promise.all([
				getNavigationData(),
				getBannerData()
			])
			setNavData(nav)
			setBannerData(banner)
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

	if (!navData || !bannerData) return null

	return (
		<header className={classes}>
			<Banner.Root type="primary">
				<Banner.Content>
					<Text
						tag="p"
						color="high-contrast"
						type="productive-body"
						size="body-small"
						collapse
					>
						{bannerData.headline}
					</Text>
				</Banner.Content>
				<Banner.Actions>
					{!session?.session ? (
						<>
							<Button
								text="Sign in / Sign up"
								variant="primary"
								size="small"
								href="/sign-in"
							/>
						</>
					) : (
						<>
							<SignOut className={s['sign-out-button']}/>
							<Button
								text="Account"
								size="small"
								variant="primary"
								href="/account"
							/>
						</>
					)}
				</Banner.Actions>
			</Banner.Root>
			<NavContent links={navData} />
		</header>
	)
}

export { HeaderNavigation }
