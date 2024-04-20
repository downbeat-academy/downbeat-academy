import * as React from "react"

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => {

  return (
    <div>
      <table
        ref={ref}
        className={className}
        {...props}
      />
    </div>
  );
})

Table.displayName = "Table"

export { Table }