import { forwardRef } from 'react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'

const DropdownMenuLabel = forwardRef<
	React.ElementRef<typeof DropdownMenuPrimitive.Label>,
	React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
		inset?: boolean
	}
>(({ className, inset, ...props }, ref) => (
	<DropdownMenuPrimitive.Label ref={ref} {...props} />
))

DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

export { DropdownMenuLabel }
