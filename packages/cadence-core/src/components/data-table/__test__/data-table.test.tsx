import React from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { DataTable } from '../data-table'
import { DataTablePagination } from '../data-table-pagination'
import { DataTableFilter } from '../data-table-filter'
import { DataTableEmpty } from '../data-table-empty'
import {
	createTextColumn,
	createCustomColumn,
	createActionsColumn,
	createDisplayColumn,
} from '../utils/column-helpers'

interface TestData {
	id: string
	name: string
	email: string
	status: string
}

const testData: TestData[] = [
	{ id: '1', name: 'John Doe', email: 'john@example.com', status: 'active' },
	{ id: '2', name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' },
	{ id: '3', name: 'Bob Johnson', email: 'bob@example.com', status: 'pending' },
]

const basicColumns = [
	createTextColumn<TestData>('name', 'Name'),
	createTextColumn<TestData>('email', 'Email'),
	createTextColumn<TestData>('status', 'Status'),
]

describe('DataTable component', () => {
	describe('basic rendering', () => {
		it('should render a table with data', () => {
			render(<DataTable data={testData} columns={basicColumns} />)

			expect(screen.getByRole('table')).toBeInstanceOf(HTMLTableElement)
			expect(screen.getByText('John Doe')).toBeInstanceOf(HTMLElement)
			expect(screen.getByText('Jane Smith')).toBeInstanceOf(HTMLElement)
			expect(screen.getByText('Bob Johnson')).toBeInstanceOf(HTMLElement)
		})

		it('should render column headers', () => {
			render(<DataTable data={testData} columns={basicColumns} />)

			expect(screen.getByText('Name')).toBeInstanceOf(HTMLElement)
			expect(screen.getByText('Email')).toBeInstanceOf(HTMLElement)
			expect(screen.getByText('Status')).toBeInstanceOf(HTMLElement)
		})

		it('should render with caption when provided', () => {
			render(
				<DataTable
					data={testData}
					columns={basicColumns}
					caption="User List"
				/>
			)

			expect(screen.getByText('User List')).toBeInstanceOf(HTMLElement)
		})
	})

	describe('empty state', () => {
		it('should render empty state when data is empty', () => {
			render(
				<DataTable
					data={[]}
					columns={basicColumns}
					emptyState={{
						title: 'No data',
						description: 'No records found',
					}}
				/>
			)

			expect(screen.getByText('No data')).toBeInstanceOf(HTMLElement)
			expect(screen.getByText('No records found')).toBeInstanceOf(HTMLElement)
		})

		it('should render custom empty state when render function is provided', () => {
			render(
				<DataTable
					data={[]}
					columns={basicColumns}
					emptyState={{
						render: () => <div>Custom empty state</div>,
					}}
				/>
			)

			expect(screen.getByText('Custom empty state')).toBeInstanceOf(HTMLElement)
		})
	})

	describe('loading state', () => {
		it('should render loading skeleton when loading is true', () => {
			render(
				<DataTable
					data={testData}
					columns={basicColumns}
					loading={true}
					loadingRowCount={3}
				/>
			)

			// Should show skeleton rows, not actual data
			expect(screen.queryByText('John Doe')).toBeNull()
		})
	})

	describe('row click', () => {
		it('should call onRowClick when a row is clicked', () => {
			const handleRowClick = vi.fn()
			render(
				<DataTable
					data={testData}
					columns={basicColumns}
					onRowClick={handleRowClick}
				/>
			)

			fireEvent.click(screen.getByText('John Doe').closest('tr')!)
			expect(handleRowClick).toHaveBeenCalledWith(testData[0])
		})
	})

	describe('sorting', () => {
		it('should render sortable headers when sorting is enabled', () => {
			render(
				<DataTable
					data={testData}
					columns={basicColumns}
					sorting={{ enabled: true }}
				/>
			)

			const nameHeader = screen.getByText('Name').closest('th')
			expect(nameHeader?.querySelector('button')).toBeInstanceOf(HTMLButtonElement)
		})

		it('should sort data when header is clicked', () => {
			render(
				<DataTable
					data={testData}
					columns={basicColumns}
					sorting={{ enabled: true }}
				/>
			)

			const nameHeader = screen.getByText('Name').closest('th')
			const sortButton = nameHeader?.querySelector('button')

			if (sortButton) {
				fireEvent.click(sortButton)
				// After sorting, Bob should be first (alphabetically)
				const rows = screen.getAllByRole('row')
				expect(rows[1].textContent).toContain('Bob')
			}
		})
	})

	describe('displayName', () => {
		it('should have correct displayName', () => {
			expect(DataTable.displayName).toBe('DataTable')
		})
	})
})

describe('DataTablePagination component', () => {
	const defaultProps = {
		pageIndex: 0,
		pageCount: 5,
		pageSize: 10,
		totalRows: 50,
		pageSizeOptions: [10, 20, 30],
		canPreviousPage: false,
		canNextPage: true,
		previousPage: vi.fn(),
		nextPage: vi.fn(),
		firstPage: vi.fn(),
		lastPage: vi.fn(),
		setPageSize: vi.fn(),
	}

	it('should render pagination info', () => {
		render(<DataTablePagination {...defaultProps} />)

		expect(screen.getByText(/Showing 1 to 10 of 50 results/)).toBeInstanceOf(
			HTMLElement
		)
	})

	it('should render page size selector when enabled', () => {
		render(<DataTablePagination {...defaultProps} showPageSizeSelector={true} />)

		expect(screen.getByLabelText(/Rows per page/)).toBeInstanceOf(HTMLSelectElement)
	})

	it('should call nextPage when next button is clicked', () => {
		const nextPage = vi.fn()
		render(<DataTablePagination {...defaultProps} nextPage={nextPage} />)

		fireEvent.click(screen.getByLabelText('Go to next page'))
		expect(nextPage).toHaveBeenCalled()
	})

	it('should disable previous buttons on first page', () => {
		render(<DataTablePagination {...defaultProps} canPreviousPage={false} />)

		const firstPageBtn = screen.getByLabelText('Go to first page') as HTMLButtonElement
		const prevPageBtn = screen.getByLabelText('Go to previous page') as HTMLButtonElement
		expect(firstPageBtn.disabled).toBe(true)
		expect(prevPageBtn.disabled).toBe(true)
	})

	it('should disable next buttons on last page', () => {
		render(<DataTablePagination {...defaultProps} canNextPage={false} />)

		const nextPageBtn = screen.getByLabelText('Go to next page') as HTMLButtonElement
		const lastPageBtn = screen.getByLabelText('Go to last page') as HTMLButtonElement
		expect(nextPageBtn.disabled).toBe(true)
		expect(lastPageBtn.disabled).toBe(true)
	})

	it('should have correct displayName', () => {
		expect(DataTablePagination.displayName).toBe('DataTablePagination')
	})
})

describe('DataTableFilter component', () => {
	it('should render filter input', () => {
		const onChange = vi.fn()
		render(<DataTableFilter value="" onChange={onChange} />)

		expect(screen.getByRole('textbox')).toBeInstanceOf(HTMLInputElement)
	})

	it('should render with custom placeholder', () => {
		const onChange = vi.fn()
		render(
			<DataTableFilter
				value=""
				onChange={onChange}
				placeholder="Search users..."
			/>
		)

		expect(screen.getByPlaceholderText('Search users...')).toBeInstanceOf(
			HTMLInputElement
		)
	})

	it('should call onChange when input value changes', async () => {
		const onChange = vi.fn()
		render(<DataTableFilter value="" onChange={onChange} />)

		const input = screen.getByRole('textbox')
		fireEvent.change(input, { target: { value: 'test' } })

		// Wait for debounce
		await new Promise((resolve) => setTimeout(resolve, 350))
		expect(onChange).toHaveBeenCalledWith('test')
	})

	it('should show clear button when value is present', () => {
		const onChange = vi.fn()
		render(<DataTableFilter value="test" onChange={onChange} />)

		expect(screen.getByLabelText('Clear filter')).toBeInstanceOf(HTMLButtonElement)
	})

	it('should have correct displayName', () => {
		expect(DataTableFilter.displayName).toBe('DataTableFilter')
	})
})

describe('DataTableEmpty component', () => {
	it('should render with default title', () => {
		render(<DataTableEmpty />)

		expect(screen.getByText('No data')).toBeInstanceOf(HTMLElement)
	})

	it('should render with custom title and description', () => {
		render(
			<DataTableEmpty
				title="No results"
				description="Try adjusting your filters"
			/>
		)

		expect(screen.getByText('No results')).toBeInstanceOf(HTMLElement)
		expect(screen.getByText('Try adjusting your filters')).toBeInstanceOf(
			HTMLElement
		)
	})

	it('should render custom content when render function is provided', () => {
		render(
			<DataTableEmpty render={() => <div>Custom empty state content</div>} />
		)

		expect(screen.getByText('Custom empty state content')).toBeInstanceOf(
			HTMLElement
		)
	})

	it('should have correct displayName', () => {
		expect(DataTableEmpty.displayName).toBe('DataTableEmpty')
	})
})

describe('Column helpers', () => {
	describe('createTextColumn', () => {
		it('should create a text column with correct properties', () => {
			const column = createTextColumn<TestData>('name', 'Name')

			expect((column as { accessorKey?: string }).accessorKey).toBe('name')
			expect(column.header).toBe('Name')
			expect(column.enableSorting).toBe(true)
		})

		it('should respect alignment option', () => {
			const column = createTextColumn<TestData>('name', 'Name', {
				alignment: 'center',
			})

			expect(column.meta?.alignment).toBe('center')
		})

		it('should respect enableSorting option', () => {
			const column = createTextColumn<TestData>('name', 'Name', {
				enableSorting: false,
			})

			expect(column.enableSorting).toBe(false)
		})
	})

	describe('createCustomColumn', () => {
		it('should create a custom column with cell renderer', () => {
			const column = createCustomColumn<TestData, string>(
				'status',
				'Status',
				(value) => <span>{value.toUpperCase()}</span>
			)

			expect((column as { accessorKey?: string }).accessorKey).toBe('status')
			expect(column.header).toBe('Status')
			expect(column.cell).toBeDefined()
		})
	})

	describe('createActionsColumn', () => {
		it('should create an actions column with sorting disabled', () => {
			const column = createActionsColumn<TestData>('actions', () => (
				<button>Edit</button>
			))

			expect(column.id).toBe('actions')
			expect(column.header).toBe('Actions')
			expect(column.enableSorting).toBe(false)
		})

		it('should default to end alignment', () => {
			const column = createActionsColumn<TestData>('actions', () => (
				<button>Edit</button>
			))

			expect(column.meta?.alignment).toBe('end')
		})
	})

	describe('createDisplayColumn', () => {
		it('should create a display column without accessor', () => {
			const column = createDisplayColumn<TestData>('custom', 'Custom', () => (
				<span>Custom content</span>
			))

			expect(column.id).toBe('custom')
			expect(column.header).toBe('Custom')
			expect(column.enableSorting).toBe(false)
		})
	})
})
