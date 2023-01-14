import classnames from 'classnames';
import { LinkProps } from './types';
import s from './link.module.scss';

const InlineLink = ({
  children,
  type = 'primary',
  href,
  target = '_self',
}: LinkProps) => {
  const classes = classnames(
    s.root,
    s[`type--${type}`],
  )

  return (
    <a className={classes} href={href} target={target}> {children}</a >
  )
}

export { InlineLink }
export type { LinkProps }