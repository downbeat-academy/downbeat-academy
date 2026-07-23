'use client'

import { Field, Input, Label, Select } from 'cadence-core'
import s from '../../_components/filter-bar.module.css'

export type StatusFilter = 'all' | 'subscribed' | 'unsubscribed'
export type AddedFilter = 'all' | '7d' | '30d'

type Props = {
	query: string
	onQueryChange: (value: string) => void
	status: StatusFilter
	onStatusChange: (value: StatusFilter) => void
	added: AddedFilter
	onAddedChange: (value: AddedFilter) => void
}

export function SubscribersFilterBar({
	query,
	onQueryChange,
	status,
	onStatusChange,
	added,
	onAddedChange,
}: Props) {
	return (
		<div className={s.root}>
			<Field>
				<Label>Search</Label>
				<Input
					name="q"
					type="text"
					placeholder="Name or email"
					value={query}
					onChange={(e) => onQueryChange(e.currentTarget.value)}
				/>
			</Field>
			<Field>
				<Label>Status</Label>
				<Select
					name="status"
					value={status}
					onChange={(e) => onStatusChange(e.currentTarget.value as StatusFilter)}
				>
					<option value="all">All statuses</option>
					<option value="subscribed">Subscribed</option>
					<option value="unsubscribed">Unsubscribed</option>
				</Select>
			</Field>
			<Field>
				<Label>Added</Label>
				<Select
					name="added"
					value={added}
					onChange={(e) => onAddedChange(e.currentTarget.value as AddedFilter)}
				>
					<option value="all">All time</option>
					<option value="7d">Last 7 days</option>
					<option value="30d">Last 30 days</option>
				</Select>
			</Field>
		</div>
	)
}
