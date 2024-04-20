import * as React from 'react'

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.HTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => {
  return (
    <td
      ref={ref}
      className={className}
      {...props}
    />
  )
})

TableCell.displayName = "TableCell"

export { TableCell }