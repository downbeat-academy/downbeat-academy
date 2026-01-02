import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { DataTable } from '../data-table'
import {
	createTextColumn,
	createCustomColumn,
	createActionsColumn,
} from '../utils/column-helpers'
import { Badge } from '../../badge'
import { Button } from '../../button'
import { Flex } from '../../flex'

interface Person {
	id: string
	firstName: string
	lastName: string
	email: string
	status: 'active' | 'inactive' | 'pending'
	role: string
	createdAt: Date
}

const sampleData: Person[] = [
	{
		id: '1',
		firstName: 'John',
		lastName: 'Doe',
		email: 'john@example.com',
		status: 'active',
		role: 'Admin',
		createdAt: new Date('2024-01-15'),
	},
	{
		id: '2',
		firstName: 'Jane',
		lastName: 'Smith',
		email: 'jane@example.com',
		status: 'active',
		role: 'Editor',
		createdAt: new Date('2024-02-20'),
	},
	{
		id: '3',
		firstName: 'Bob',
		lastName: 'Johnson',
		email: 'bob@example.com',
		status: 'inactive',
		role: 'Viewer',
		createdAt: new Date('2024-03-10'),
	},
	{
		id: '4',
		firstName: 'Alice',
		lastName: 'Williams',
		email: 'alice@example.com',
		status: 'pending',
		role: 'Editor',
		createdAt: new Date('2024-04-05'),
	},
	{
		id: '5',
		firstName: 'Charlie',
		lastName: 'Brown',
		email: 'charlie@example.com',
		status: 'active',
		role: 'Admin',
		createdAt: new Date('2024-05-01'),
	},
]

const largeDataset: Person[] = Array.from({ length: 50 }, (_, i) => ({
	id: String(i + 1),
	firstName: `First${i + 1}`,
	lastName: `Last${i + 1}`,
	email: `user${i + 1}@example.com`,
	status: (['active', 'inactive', 'pending'] as const)[i % 3],
	role: (['Admin', 'Editor', 'Viewer'] as const)[i % 3],
	createdAt: new Date(2024, i % 12, (i % 28) + 1),
}))

const basicColumns = [
	createTextColumn<Person>('firstName', 'First Name'),
	createTextColumn<Person>('lastName', 'Last Name'),
	createTextColumn<Person>('email', 'Email'),
	createTextColumn<Person>('role', 'Role'),
]

const columnsWithStatus = [
	createTextColumn<Person>('firstName', 'First Name'),
	createTextColumn<Person>('lastName', 'Last Name'),
	createTextColumn<Person>('email', 'Email'),
	createCustomColumn<Person, string>('status', 'Status', (status) => (
		<Badge
			text={status.charAt(0).toUpperCase() + status.slice(1)}
			type={status === 'active' ? 'success' : status === 'pending' ? 'warning' : 'neutral'}
			size="small"
			style="filled"
		/>
	)),
	createTextColumn<Person>('role', 'Role'),
]

const columnsWithActions = [
	...columnsWithStatus,
	createActionsColumn<Person>('actions', (row) => (
		<Flex gap="small" direction="row">
			<Button
				variant="secondary"
				size="small"
				text="Edit"
				onClick={() => console.log('Edit', row)}
			/>
			<Button
				variant="ghost"
				size="small"
				text="Delete"
				onClick={() => console.log('Delete', row)}
			/>
		</Flex>
	)),
]

const meta: Meta = {
	title: 'Cadence / Components / DataTable',
	component: DataTable,
	parameters: {
		layout: 'padded',
	},
}

export default meta
type Story = StoryObj<typeof DataTable>

export const Basic: Story = {
	args: {
		data: sampleData,
		columns: basicColumns,
	},
}

export const WithCustomCells: Story = {
	args: {
		data: sampleData,
		columns: columnsWithStatus,
	},
}

export const WithActions: Story = {
	args: {
		data: sampleData,
		columns: columnsWithActions,
	},
}

export const WithSorting: Story = {
	args: {
		data: sampleData,
		columns: columnsWithStatus,
		sorting: {
			enabled: true,
		},
	},
}

export const WithDefaultSorting: Story = {
	args: {
		data: sampleData,
		columns: columnsWithStatus,
		sorting: {
			enabled: true,
			defaultSorting: [{ id: 'lastName', desc: false }],
		},
	},
}

export const WithPagination: Story = {
	args: {
		data: largeDataset,
		columns: columnsWithStatus,
		pagination: {
			enabled: true,
			pageSize: 10,
			showPageSizeSelector: true,
		},
	},
}

export const WithFiltering: Story = {
	args: {
		data: sampleData,
		columns: columnsWithStatus,
		filtering: {
			enabled: true,
			placeholder: 'Search users...',
		},
	},
}

export const FullFeatured: Story = {
	args: {
		data: largeDataset,
		columns: columnsWithActions,
		sorting: {
			enabled: true,
		},
		pagination: {
			enabled: true,
			pageSize: 10,
			showPageSizeSelector: true,
		},
		filtering: {
			enabled: true,
			placeholder: 'Search users...',
		},
	},
}

export const WithBackground: Story = {
	args: {
		data: sampleData,
		columns: columnsWithStatus,
		backgroundColor: 'primary',
	},
}

export const Loading: Story = {
	args: {
		data: sampleData,
		columns: columnsWithStatus,
		loading: true,
		loadingRowCount: 5,
	},
}

export const Empty: Story = {
	args: {
		data: [],
		columns: columnsWithStatus,
		emptyState: {
			title: 'No users found',
			description: 'Try adjusting your search or filters',
		},
	},
}

export const WithRowClick: Story = {
	args: {
		data: sampleData,
		columns: columnsWithStatus,
		onRowClick: (row) => console.log('Row clicked:', row),
	},
}
