interface LinkProps {
  children: string,
  href: string,
  type?: 'primary' | 'secondary',
  target?: '_blank' | '_self',
  documentType?: string,
  style?: 'default' | 'expressive'
}

export type { LinkProps }