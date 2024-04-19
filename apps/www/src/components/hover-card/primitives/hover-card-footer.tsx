import classnames from 'classnames'
import s from '../hover-card.module.scss'

type HoverCardFooterProps = {
  children: React.ReactNode;
  className?: string;
}

const HoverCardFooter = ({ children, className, ...props }: HoverCardFooterProps) => {

  const classes = classnames(s.footer, className)

  return (
    <footer className={classes} {...props}>
      {children}
    </footer>
  )
}

export { HoverCardFooter }