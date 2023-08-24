import classnames from 'classnames'
import s from './header-navigation.module.scss'
import * as Banner from '@components/banner'
import { Text } from '@components/text'
import { Button } from '@components/button'
import { NavContent } from './nav-content'

import type { HeaderNavigationProps } from './types'

const HeaderNavigation = ({
  className,
}: HeaderNavigationProps) => {

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
            Announcing Downbeat Academy v3! 🚀
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
      <NavContent />
    </header>
  )
}

export { HeaderNavigation } 