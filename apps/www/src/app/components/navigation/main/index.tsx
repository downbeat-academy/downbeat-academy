import classnames from 'classnames'
import s from './main-navigation.module.scss'
import * as Banner from '@app/components/banner'

import type { MainNavigationProps } from './types'

export const MainNavigation = ({
  className,
}: MainNavigationProps) => {

  const classes = classnames(
    s['main-navigation--root'],
    [className],
  )

  return (
    <header className={classes}>
      <Banner.Root type='primary'>
        <Banner.Content>
          <p>This is the banner content</p>
        </Banner.Content>
        <Banner.Actions>
          <p>These are the actions</p>
        </Banner.Actions>
      </Banner.Root>
      <p>This is the main navigation</p>
    </header>
  )
}