import { forwardRef } from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import s from "../toast.module.scss";

const ToastTitle = forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={s['toast--title']}
    {...props}
  />
))

ToastTitle.displayName = ToastPrimitives.Title.displayName

export { ToastTitle }