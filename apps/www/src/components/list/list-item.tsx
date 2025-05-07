import classnames from 'classnames'
import s from './list-item.module.css'
import { Link } from '@components/link'
import { Text, Badge } from 'cadence-core'

import type { ListItemProps } from './types'

const ListItem = ({
	title,
	description,
	date,
	url,
	className,
	children,
}: ListItemProps) => {
	const classes = classnames(s.root, className)

	return (
		<article className={classes}>
			<Text
				tag="h3"
				size="h5"
				type="expressive-headline"
				color="primary"
				collapse
			>
				<Link href={url} type="inherit">
					{title}
				</Link>
			</Text>
			{date && <Badge size="small" type="neutral" text={date} />}
			{description && (
				<Text tag="p" size="body-base" type="expressive-body" collapse>
					{description}
				</Text>
			)}
			{children}
		</article>
	)
}

export { ListItem }
export type { ListItemProps }
