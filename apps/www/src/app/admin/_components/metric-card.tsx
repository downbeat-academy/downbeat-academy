import { Card, Flex, Text, Badge } from 'cadence-core'
import s from './metric-card.module.css'

type Delta = {
	value: number
	direction: 'up' | 'down' | 'flat'
	label?: string
}

type MetricCardProps = {
	label: string
	value: string | number | null
	delta?: Delta
	hint?: string
}

const deltaTone = {
	up: 'success',
	down: 'error',
	flat: 'neutral',
} as const

const deltaPrefix = {
	up: '+',
	down: '-',
	flat: '',
} as const

export function MetricCard({ label, value, delta, hint }: MetricCardProps) {
	const isPlaceholder = value === null || value === undefined
	const displayValue = isPlaceholder ? '—' : formatValue(value as string | number)

	return (
		<Card borderColor="faint" background="primary">
			<Flex direction="column" gap="small" padding="large">
				<Text type="productive-body" size="body-small" color="faint" collapse>
					{label}
				</Text>
				<div className={`${s.value} ${isPlaceholder ? s.placeholder : ''}`}>
					{displayValue}
				</div>
				{(delta || hint) && (
					<Flex direction="row" gap="small" alignItems="center">
						{delta && (
							<Badge
								type={deltaTone[delta.direction]}
								size="small"
								style="light"
								text={`${deltaPrefix[delta.direction]}${Math.abs(delta.value)}${delta.label ? ' ' + delta.label : ''}`}
							/>
						)}
						{hint && (
							<Text type="productive-body" size="body-small" color="faint" collapse>
								{hint}
							</Text>
						)}
					</Flex>
				)}
			</Flex>
		</Card>
	)
}

function formatValue(value: string | number): string {
	if (typeof value === 'number') return value.toLocaleString()
	return value
}
