import * as React from 'react'
import classnames from 'classnames'
import s from './table.module.scss'

interface TableProps {
	backgroundColor?: 'none' | 'primary'
}

const Table = React.forwardRef<
	HTMLTableElement,
	React.HTMLAttributes<HTMLTableElement> & TableProps
>(({ className, backgroundColor = 'none', ...props }, ref) => {
	const classes = classnames([s['table--wrapper'], className])

	return (
		<div className={classes}>
			<table ref={ref} className={s['table--main']} {...props} />
		</div>
	)
})

Table.displayName = 'Table'

export { Table }
