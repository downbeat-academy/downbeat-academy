import type { ReactNode } from 'react'
import { Card, Text, Flex } from 'cadence-core'
import s from './chart-card.module.css'

type ChartCardProps = {
	title: string
	description?: string
	children: ReactNode
}

export function ChartCard({ title, description, children }: ChartCardProps) {
	return (
		<Card borderColor="faint" background="primary">
			<div className={s.root}>
				<div className={s.header}>
					<Flex direction="column" gap="2x-small">
						<Text type="productive-headline" size="h6" color="primary" collapse>
							{title}
						</Text>
						{description && (
							<Text type="productive-body" size="body-small" color="faint" collapse>
								{description}
							</Text>
						)}
					</Flex>
				</div>
				<div className={s.body}>{children}</div>
			</div>
		</Card>
	)
}
