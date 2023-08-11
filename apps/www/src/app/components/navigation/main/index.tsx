import classnames from 'classnames'
import s from './MainNavigation.module.scss'

import type { MainNavigationProps } from './types'

export const MainNavigation = ({
  className,
}: MainNavigationProps) => {

  const classes = classnames(
    [s.mainNavigationRoot],
    [className]
  )

  return (
    <header className={classes}>
      <p>This is the main navigation</p>
    </header>
  )
}