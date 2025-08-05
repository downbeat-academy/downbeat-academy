import React from 'react'
import classnames from 'classnames'
import s from './banner-actions.module.css'

const BannerActions = ({ children }: { children: React.ReactNode }) => {
	const classes = classnames([s[`wrapper`]])

	return <aside className={classes}>{children}</aside>
}

BannerActions.displayName = 'BannerActions'

const Actions = BannerActions

export { BannerActions, Actions }