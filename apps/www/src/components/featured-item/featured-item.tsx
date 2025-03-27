import s from './featured-item.module.css'

import type { FeaturedItemProps } from './types'

const FeaturedItem = ({ children }: FeaturedItemProps) => {
	return <article className={s.root}>{children}</article>
}

FeaturedItem.displayName = 'FeaturedItem'

const Root = FeaturedItem

export { FeaturedItem, Root }
export type { FeaturedItemProps }
