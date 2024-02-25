import s from '../dialog.module.scss'

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={s.footer}
    {...props}
  />
)

DialogFooter.displayName = "DialogFooter"

export { DialogFooter }