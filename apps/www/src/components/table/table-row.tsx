import * as React from 'react'

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => {
  return (
    <tr
      ref={ref}
      className={className}
      {...props}
    />
  )
})

TableRow.displayName = "TableRow"

export { TableRow }