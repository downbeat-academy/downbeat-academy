import type { ReactNode } from 'react'
import { Card, Text } from 'cadence-core'
import s from './recent-list-card.module.css'

type RecentListCardProps = {
	title: string
	items: ReactNode[]
	emptyLabel?: string
}

export function RecentListCard({
	title,
	items,
	emptyLabel = 'No recent activity',
}: RecentListCardProps) {
	return (
		<Card borderColor="faint" background="primary">
			<div className={s.root}>
				<div className={s.title}>
					<Text type="productive-headline" size="h6" color="primary" collapse>
						{title}
					</Text>
				</div>
				{items.length === 0 ? (
					<div className={s.empty}>
						<Text type="productive-body" size="body-small" color="faint" collapse>
							{emptyLabel}
						</Text>
					</div>
				) : (
					items
				)}
			</div>
		</Card>
	)
}

export function RecentListRow({
	primary,
	secondary,
	meta,
}: {
	primary: ReactNode
	secondary?: ReactNode
	meta?: ReactNode
}) {
	return (
		<div className={s.row}>
			<div className={s.rowMain}>
				<Text type="productive-body" size="body-base" color="primary" collapse>
					{primary}
				</Text>
				{secondary && (
					<Text type="productive-body" size="body-small" color="faint" collapse>
						{secondary}
					</Text>
				)}
			</div>
			{meta && (
				<div className={s.rowMeta}>
					<Text type="productive-body" size="body-small" color="faint" collapse>
						{meta}
					</Text>
				</div>
			)}
		</div>
	)
}
