import classnames from 'classnames'
import s from './main-navigation.module.scss'
import * as Banner from '@app/components/banner'

import type { HeaderNavigationProps } from './types'

const HeaderNavigation = ({
  className,
}: HeaderNavigationProps) => {

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
    </header>
  )
}

export { HeaderNavigation }