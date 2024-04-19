import { forwardRef } from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { ChevronRight } from 'cadence-icons'

const DropdownMenuSubTrigger = forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean
  }
>(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    {...props}
  >
    {children}
    <ChevronRight width={16} />
  </DropdownMenuPrimitive.SubTrigger>
))

DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName

export { DropdownMenuSubTrigger }