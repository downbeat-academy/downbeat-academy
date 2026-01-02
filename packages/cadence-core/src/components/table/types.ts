import { HTMLAttributes, ThHTMLAttributes, TdHTMLAttributes } from 'react'

/**
 * Alignment options for table cells
 */
type TableAlignment = 'start' | 'center' | 'end'

/**
 * Background color options for the table wrapper
 */
type TableBackgroundColor = 'none' | 'primary'

/**
 * Props for the Table component
 */
interface TableProps extends HTMLAttributes<HTMLTableElement> {
	/** Background color of the table wrapper */
	backgroundColor?: TableBackgroundColor
}

/**
 * Props for the TableHeader component (thead)
 */
interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {}

/**
 * Props for the TableBody component (tbody)
 */
interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {}

/**
 * Props for the TableFooter component (tfoot)
 */
interface TableFooterProps extends HTMLAttributes<HTMLTableSectionElement> {}

/**
 * Props for the TableRow component (tr)
 */
interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
	/** Whether this row is a header row */
	isHeader?: boolean
}

/**
 * Props for the TableHead component (th)
 */
interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
	/** Text alignment within the cell */
	alignment?: TableAlignment
}

/**
 * Props for the TableCell component (td)
 */
interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
	/** Text alignment within the cell */
	alignment?: TableAlignment
}

/**
 * Props for the TableCaption component (caption)
 */
interface TableCaptionProps extends HTMLAttributes<HTMLTableCaptionElement> {}

export type {
	TableAlignment,
	TableBackgroundColor,
	TableProps,
	TableHeaderProps,
	TableBodyProps,
	TableFooterProps,
	TableRowProps,
	TableHeadProps,
	TableCellProps,
	TableCaptionProps,
}
