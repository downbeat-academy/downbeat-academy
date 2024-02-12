import classnames from 'classnames'
import { mainNavQuery, bannerQuery } from '@lib/queries'
import { sanityClient } from '@lib/sanity/sanity.client'
import s from './header-navigation.module.scss'
import * as Banner from '@components/banner'
import { Text } from '@components/text'
import { Button } from '@components/button'
import { NavContent } from './nav-content'

import type { HeaderNavigationProps } from './types'

// Fetch the data for the navigation
async function getNavigationData() {
  const client = sanityClient
  const res = client.fetch(mainNavQuery)

  if (!res) {
    throw new Error('Failed to fetch the main navigation data.')
  }

  return res;
}

async function getBannerData() {
  const client = sanityClient
  const res = client.fetch(bannerQuery)

  if (!res) {
    throw new Error('Failed to fetch the banner data.');
  }

  return res;
}

// Render the component
const HeaderNavigation = async ({
  className,
}: HeaderNavigationProps) => {

  const navData = await getNavigationData();

  const {
    title: bannerTitle,
    headline: bannerHeadline
  } = await getBannerData();

  const classes = classnames(
    s.root,
    [className],
  )

  return (
    <header className={classes}>
      <Banner.Root type='primary'>
        <Banner.Content>
          <Text
            tag='p'
            color='high-contrast'
            type='productive-body'
            size='body-small'
            collapse
          >
            {bannerHeadline}
          </Text>
        </Banner.Content>
        <Banner.Actions>
          <Button
            text='Login'
            variant='ghost'
            className={s[`login-button`]}
            size='small'
          />
          <Button
            text='Sign up for free'
            variant='primary'
            size='small'
          />
        </Banner.Actions>
      </Banner.Root>
      <NavContent links={navData} />
    </header>
  )
}

export { HeaderNavigation } 