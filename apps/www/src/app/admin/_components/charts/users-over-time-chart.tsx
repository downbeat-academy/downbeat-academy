'use client'

import {
	ResponsiveContainer,
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from 'recharts'
import type { MetricPoint } from '@/lib/admin/types'

type Props = {
	data: MetricPoint[]
}

export function UsersOverTimeChart({ data }: Props) {
	return (
		<ResponsiveContainer width="100%" height="100%">
			<LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
				<CartesianGrid stroke="var(--cds-color-border-faint)" strokeDasharray="3 3" />
				<XAxis
					dataKey="date"
					stroke="var(--cds-color-foreground-faint)"
					fontSize={12}
					tickFormatter={(v: string) => v.slice(5)}
				/>
				<YAxis
					stroke="var(--cds-color-foreground-faint)"
					fontSize={12}
					allowDecimals={false}
				/>
				<Tooltip
					contentStyle={{
						background: 'var(--cds-color-page-secondary)',
						border: '1px solid var(--cds-color-border-faint)',
						borderRadius: 'var(--cds-radii-hard)',
						fontSize: 12,
					}}
					labelFormatter={(label) => `Date: ${label}`}
				/>
				<Legend wrapperStyle={{ fontSize: 12 }} />
				<Line
					type="monotone"
					dataKey="newUsers"
					name="New users"
					stroke="var(--cds-color-foreground-brand-default)"
					strokeWidth={2}
					dot={false}
				/>
				<Line
					type="monotone"
					dataKey="cumulative"
					name="Cumulative"
					stroke="var(--cds-color-foreground-interactive-default)"
					strokeWidth={2}
					dot={false}
				/>
			</LineChart>
		</ResponsiveContainer>
	)
}
