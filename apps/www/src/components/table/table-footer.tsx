import * as React from 'react'

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
  return (
    <tfoot
      ref={ref}
      className={className}
      {...props}
    />
  )
})

TableFooter.displayName = "TableFooter"

export { TableFooter }