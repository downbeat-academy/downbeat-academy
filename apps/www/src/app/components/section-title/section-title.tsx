import classnames from 'classnames'
import s from './section-title.module.scss'

import type { SectionTitleProps } from "./types";

const SectionTitle = ({
  title,
  subtitle,
  background,
  alignment = 'left',
  className,
  hasBorder = true,
  children,
}: SectionTitleProps) => {

  const classes = classnames([
    s.root,
    s[`alignment--${alignment}`],
    s[`background--${background}`],
    {
      [s[`has-border`]]: hasBorder
    },
    className,
  ])

  return (
    <div className={classes}>
      {title}
      {subtitle}
      {children}
    </div>
  )
}

export { SectionTitle }
export type { SectionTitleProps };