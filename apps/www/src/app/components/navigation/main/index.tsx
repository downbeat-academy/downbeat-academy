import classnames from 'classnames'
import s from './main-navigation.module.scss'

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
      <p>This is the main navigation</p>
    </header>
  )
}