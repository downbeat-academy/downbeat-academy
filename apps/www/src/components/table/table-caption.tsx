import * as React from 'react'

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => {
  return (
    <caption
      ref={ref}
      className={className}
      {...props}
    />
  )
})

TableCaption.displayName = "TableCaption"

export { TableCaption }