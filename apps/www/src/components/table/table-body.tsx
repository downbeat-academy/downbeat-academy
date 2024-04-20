import * as React from 'react'

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => {
  return (
    <tbody
      ref={ref}
      className={className}
      {...props}
    />
  )
})

TableBody.displayName = "TableBody"

export { TableBody }