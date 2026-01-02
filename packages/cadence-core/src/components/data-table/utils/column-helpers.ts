import type { ColumnDef } from '@tanstack/react-table'
import type { ReactNode } from 'react'
import type { DataTableAlignment } from '../types'

interface ColumnOptions {
	/** Text alignment for the column */
	alignment?: DataTableAlignment
	/** Whether sorting is enabled for this column */
	enableSorting?: boolean
}

/**
 * Helper to create a simple text column
 */
export function createTextColumn<TData>(
	accessorKey: keyof TData & string,
	header: string,
	options?: ColumnOptions
): ColumnDef<TData, string> {
	return {
		accessorKey,
		header,
		meta: {
			alignment: options?.alignment ?? 'start',
		},
		enableSorting: options?.enableSorting ?? true,
	}
}

/**
 * Helper to create a column with custom cell renderer
 */
export function createCustomColumn<TData, TValue = unknown>(
	accessorKey: keyof TData & string,
	header: string,
	cell: (value: TValue, row: TData) => ReactNode,
	options?: ColumnOptions
): ColumnDef<TData, TValue> {
	return {
		accessorKey,
		header,
		cell: ({ getValue, row }) => cell(getValue() as TValue, row.original),
		meta: {
			alignment: options?.alignment ?? 'start',
		},
		enableSorting: options?.enableSorting ?? true,
	}
}

/**
 * Helper to create an actions column (no sorting by default)
 */
export function createActionsColumn<TData>(
	id: string,
	cell: (row: TData) => ReactNode,
	options?: {
		header?: string
		alignment?: DataTableAlignment
	}
): ColumnDef<TData, unknown> {
	return {
		id,
		header: options?.header ?? 'Actions',
		cell: ({ row }) => cell(row.original),
		meta: {
			alignment: options?.alignment ?? 'end',
		},
		enableSorting: false,
	}
}

/**
 * Helper to create a display column (no accessor, custom content)
 */
export function createDisplayColumn<TData>(
	id: string,
	header: string,
	cell: (row: TData) => ReactNode,
	options?: ColumnOptions
): ColumnDef<TData, unknown> {
	return {
		id,
		header,
		cell: ({ row }) => cell(row.original),
		meta: {
			alignment: options?.alignment ?? 'start',
		},
		enableSorting: options?.enableSorting ?? false,
	}
}
