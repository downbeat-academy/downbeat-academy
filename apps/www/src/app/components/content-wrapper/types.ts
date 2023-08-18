interface ContentWrapperProps {
  children: React.ReactNode,
  className?: string,
}

interface ContentProps {
  children: React.ReactNode,
  isFullBleed?: boolean,
  className?: string,
}

export type { ContentWrapperProps, ContentProps };