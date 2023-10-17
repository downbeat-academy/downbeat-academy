import classnames from 'classnames'
import s from './section-container.module.scss'

import type { SectionContainerProps } from "./types"

const SectionContainer = ({
  children,
  tag = 'div',
  background,
  borderColor = 'primary',
  className,
}: SectionContainerProps) => {

  const classes = classnames([
    s.root,
    s[`background--${background}`],
    s[`border-color--${borderColor}`],
    className,
  ])

  const Tag = tag;

  return (
    <Tag className={classes}>
      {children}
    </Tag>
  )
}

export { SectionContainer }
export type { SectionContainerProps }