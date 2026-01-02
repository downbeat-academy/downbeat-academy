import type {
	ColumnDef,
	SortingState,
	PaginationState,
	RowData,
	Header,
	Cell,
	Row,
	Table,
} from '@tanstack/react-table'
import type { ReactNode, HTMLAttributes } from 'react'

// Extend TanStack's ColumnMeta for custom properties
declare module '@tanstack/react-table' {
	interface ColumnMeta<TData extends RowData, TValue> {
		/** Text alignment within column */
		alignment?: DataTableAlignment
		/** Column header display name (for accessibility) */
		headerLabel?: string
	}
}

/**
 * Alignment options for table cells
 */
export type DataTableAlignment = 'start' | 'center' | 'end'

/**
 * Background color options for the table wrapper
 */
export type DataTableBackgroundColor = 'none' | 'primary'

/**
 * Sorting configuration
 */
export interface DataTableSortingConfig {
	/** Enable sorting */
	enabled: boolean
	/** Server-side sorting (manual mode) */
	manual?: boolean
	/** Allow multi-column sorting */
	enableMultiSort?: boolean
	/** Default sorting state */
	defaultSorting?: SortingState
	/** Callback when sorting changes (for manual mode) */
	onSortingChange?: (sorting: SortingState) => void
}

/**
 * Pagination configuration
 */
export interface DataTablePaginationConfig {
	/** Enable pagination */
	enabled: boolean
	/** Server-side pagination (manual mode) */
	manual?: boolean
	/** Page size options */
	pageSizeOptions?: number[]
	/** Default page size */
	pageSize?: number
	/** Total page count (required for manual pagination) */
	pageCount?: number
	/** Show page size selector */
	showPageSizeSelector?: boolean
	/** Callback when pagination changes (for manual mode) */
	onPaginationChange?: (pagination: PaginationState) => void
}

/**
 * Filtering configuration
 */
export interface DataTableFilteringConfig {
	/** Enable filtering */
	enabled: boolean
	/** Server-side filtering (manual mode) */
	manual?: boolean
	/** Placeholder text for filter input */
	placeholder?: string
	/** Callback when filter changes (for manual mode) */
	onFilterChange?: (filter: string) => void
}

/**
 * Empty state configuration
 */
export interface DataTableEmptyStateConfig {
	/** Title text for empty state */
	title?: string
	/** Description text for empty state */
	description?: string
	/** Custom empty state component */
	render?: () => ReactNode
}

/**
 * Main DataTable props
 */
export interface DataTableProps<TData> extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
	/** Data array to display */
	data: TData[]
	/** Column definitions - use any for value type to allow mixed column types */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	columns: ColumnDef<TData, any>[]
	/** Background color of the table wrapper */
	backgroundColor?: DataTableBackgroundColor
	/** Sorting configuration */
	sorting?: DataTableSortingConfig | false
	/** Pagination configuration */
	pagination?: DataTablePaginationConfig | false
	/** Filtering configuration */
	filtering?: DataTableFilteringConfig | false
	/** Empty state configuration */
	emptyState?: DataTableEmptyStateConfig
	/** Table caption for accessibility */
	caption?: string
	/** Callback when row is clicked */
	onRowClick?: (row: TData) => void
	/** Loading state */
	loading?: boolean
	/** Loading row count for skeleton */
	loadingRowCount?: number
}

/**
 * Column header props
 */
export interface DataTableColumnHeaderProps<TData, TValue> {
	/** TanStack header object */
	header: Header<TData, TValue>
	/** Column title text */
	title: string
	/** Alignment */
	alignment?: DataTableAlignment
	/** Whether sorting is enabled */
	sortingEnabled?: boolean
	/** Additional CSS class */
	className?: string
}

/**
 * Cell props
 */
export interface DataTableCellProps {
	/** Alignment */
	alignment?: DataTableAlignment
	/** Additional CSS class */
	className?: string
	/** Cell content */
	children?: ReactNode
}

/**
 * Row props
 */
export interface DataTableRowProps<TData> {
	/** TanStack row object */
	row: Row<TData>
	/** Whether row is header row */
	isHeader?: boolean
	/** Click handler */
	onClick?: () => void
	/** Additional CSS class */
	className?: string
	/** Children (cells) */
	children?: ReactNode
}

/**
 * Header props
 */
export interface DataTableHeaderProps<TData> {
	/** TanStack table instance */
	table: Table<TData>
	/** Whether sorting is enabled */
	sortingEnabled?: boolean
	/** Additional CSS class */
	className?: string
}

/**
 * Body props
 */
export interface DataTableBodyProps<TData> {
	/** TanStack table instance */
	table: Table<TData>
	/** Row click handler */
	onRowClick?: (row: TData) => void
	/** Loading state */
	loading?: boolean
	/** Number of loading skeleton rows */
	loadingRowCount?: number
	/** Additional CSS class */
	className?: string
}

/**
 * Pagination props
 */
export interface DataTablePaginationProps {
	/** Current page index (0-based) */
	pageIndex: number
	/** Total page count */
	pageCount: number
	/** Current page size */
	pageSize: number
	/** Total row count */
	totalRows: number
	/** Page size options */
	pageSizeOptions: number[]
	/** Whether there is a previous page */
	canPreviousPage: boolean
	/** Whether there is a next page */
	canNextPage: boolean
	/** Go to previous page */
	previousPage: () => void
	/** Go to next page */
	nextPage: () => void
	/** Go to first page */
	firstPage: () => void
	/** Go to last page */
	lastPage: () => void
	/** Set page size */
	setPageSize: (size: number) => void
	/** Show page size selector */
	showPageSizeSelector?: boolean
	/** Additional CSS class */
	className?: string
}

/**
 * Filter props
 */
export interface DataTableFilterProps {
	/** Current filter value */
	value: string
	/** Filter change handler */
	onChange: (value: string) => void
	/** Placeholder text */
	placeholder?: string
	/** Additional CSS class */
	className?: string
}

/**
 * Empty state props
 */
export interface DataTableEmptyProps {
	/** Title text */
	title?: string
	/** Description text */
	description?: string
	/** Custom render function */
	render?: () => ReactNode
	/** Additional CSS class */
	className?: string
}

// Re-export TanStack types for consumers
export type { ColumnDef, SortingState, PaginationState }
