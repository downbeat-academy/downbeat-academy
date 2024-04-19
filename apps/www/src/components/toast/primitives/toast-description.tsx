import { forwardRef } from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import s from "../toast.module.scss";

const ToastDescription = forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={s['toast--description']}
    {...props}
  />
))

ToastDescription.displayName = ToastPrimitives.Description.displayName

export { ToastDescription }