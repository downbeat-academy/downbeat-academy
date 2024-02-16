import classnames from 'classnames'
import { cookies } from 'next/headers'
import { mainNavQuery, bannerQuery } from '@lib/queries'
import { sanityClient } from '@lib/sanity/sanity.client'
import { createClient } from '@lib/supabase/supabase.server'
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

  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.auth.getUser()

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
          {
            !data?.user ? (
              <>
                <Button
                  text='Login'
                  variant='ghost'
                  className={s[`login-button`]}
                  size='small'
                  href='/login'
                />
                <Button
                  text='Sign up for free'
                  variant='primary'
                  size='small'
                  href='/sign-up'
                />
              </>
            ) : (
              <>
                <Button
                  text='Log out'
                  size='small'
                  variant='ghost'
                  className={s[`login-button`]}
                  href='/logout'
                />
                <Button
                  text='My account'
                  variant='primary'
                  size='small'
                  href='/account'
                />
              </>
            )
          }
        </Banner.Actions>
      </Banner.Root>
      <NavContent links={navData} />
    </header>
  )
}

export { HeaderNavigation } 