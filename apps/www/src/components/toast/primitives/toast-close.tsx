import { forwardRef } from "react";
import { X } from 'cadence-icons'
import * as ToastPrimitives from "@radix-ui/react-toast";
import s from "../toast.module.scss";

const ToastClose = forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    toast-close=""
    className={s['toast--close']}
    {...props}
  >
    <X width={16} />
  </ToastPrimitives.Close>
))

ToastClose.displayName = ToastPrimitives.Close.displayName

export { ToastClose }