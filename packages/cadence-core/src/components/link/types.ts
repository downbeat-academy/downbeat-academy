interface LinkProps {
  children: React.ReactNode,
  type?: 'interactive' | 'primary' | 'secondary',
  href?: string,
  target?: '_self' | '_blank',
}

export type { LinkProps }