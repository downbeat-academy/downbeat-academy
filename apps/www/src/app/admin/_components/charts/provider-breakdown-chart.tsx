'use client'

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'
import type { ProviderSlice } from '@/lib/admin/types'

type Props = {
	data: ProviderSlice[]
}

const PALETTE = [
	'var(--cds-color-palette-violet-500)',
	'var(--cds-color-palette-blueberry-500)',
	'var(--cds-color-palette-kale-500)',
	'var(--cds-color-palette-peach-500)',
	'var(--cds-color-palette-pineapple-500)',
]

export function ProviderBreakdownChart({ data }: Props) {
	if (data.length === 0) {
		return null
	}
	return (
		<ResponsiveContainer width="100%" height="100%">
			<PieChart>
				<Pie
					data={data}
					dataKey="count"
					nameKey="providerId"
					innerRadius="55%"
					outerRadius="80%"
					paddingAngle={2}
				>
					{data.map((_, i) => (
						<Cell key={i} fill={PALETTE[i % PALETTE.length]} />
					))}
				</Pie>
				<Tooltip
					contentStyle={{
						background: 'var(--cds-color-page-secondary)',
						border: '1px solid var(--cds-color-border-faint)',
						borderRadius: 'var(--cds-radii-hard)',
						fontSize: 12,
					}}
				/>
				<Legend wrapperStyle={{ fontSize: 12 }} />
			</PieChart>
		</ResponsiveContainer>
	)
}
