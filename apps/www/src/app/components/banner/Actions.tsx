import classnames from 'classnames'
import s from './banner-actions.module.scss'

const BANNER_ACTIONS_NAME = 'Actions'

const BannerActions = ({ children }: { children: React.ReactNode }) => {

  const classes = classnames([
    s[`banner-actions--wrapper`],
  ])

  return (
    <aside className={classes}>
      {children}
    </aside>
  )
}

BannerActions.displayName = BANNER_ACTIONS_NAME;

const Actions = BannerActions

export { BannerActions, Actions }