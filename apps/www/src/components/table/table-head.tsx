import * as React from 'react'

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => {
  return (
    <th
      ref={ref}
      className={className}
      {...props}
    />
  )
})

TableHead.displayName = "TableHead"

export { TableHead }