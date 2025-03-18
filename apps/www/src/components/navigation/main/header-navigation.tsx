import { auth } from '@lib/auth/auth'
import { headers } from 'next/headers'
import classnames from 'classnames'
import { mainNavQuery, bannerQuery } from '@lib/queries'
import { sanityClient } from '@lib/sanity/sanity.client'
import s from './header-navigation.module.scss'
import * as Banner from '@components/banner'
import { Text } from 'cadence-core'
import { Button } from '@components/button'
import { NavContent } from './nav-content'

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
const HeaderNavigation = async ({ className }: HeaderNavigationProps) => {
	const session = await auth.api.getSession({
    headers: await headers()
  })

	const navData = await getNavigationData()

	const { title: bannerTitle, headline: bannerHeadline } = await getBannerData()

	const classes = classnames(s.root, [className])

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
						{bannerHeadline}
					</Text>
				</Banner.Content>
				<Banner.Actions>
					{!session ? (
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
