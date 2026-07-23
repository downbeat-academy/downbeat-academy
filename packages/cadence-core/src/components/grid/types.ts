import { ElementType, HTMLAttributes } from 'react'

type GridGap =
	| 'none'
	| '2x-small'
	| 'x-small'
	| 'small'
	| 'medium'
	| 'large'
	| 'x-large'
	| '2x-large'
	| '3x-large'

interface GridProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
	children?: React.ReactNode
	columns?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
	/** Space between grid items, mapped to the `--cds-scale-*` tokens */
	gap?: GridGap
	/**
	 * Overrides the auto-fit column threshold. Columns default to a minimum of
	 * `1200px / columns`, which is too wide inside narrow layout regions — pass a
	 * CSS length (e.g. `200px`) to keep items on a single row.
	 */
	minColumnWidth?: string
	tag?: ElementType | string
	className?: string
}

export type { GridProps, GridGap }
