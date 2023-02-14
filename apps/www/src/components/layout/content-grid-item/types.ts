interface ContentGridItemProps {
  children: React.ReactNode,
  location: 'sidebar-left' | 'sidebar-right' | 'center' | 'full-bleed',
  padding?: 'none' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large',
  gap?: 'none' | 'small' | 'medium' | 'large',
}

export type { ContentGridItemProps }