interface ListProps {
  listType: 'ul' | 'ol',
  context?: 'productive' | 'expressive',
  children: React.ReactNode,
}

interface ListItemProps {
  children: React.ReactNode,
}

export type { ListProps, ListItemProps }