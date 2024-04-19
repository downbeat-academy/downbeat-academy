interface AvatarProps {
  imageUrl?: string,
  imageObject?: any,
  name?: string,
  size?: 'small' | 'medium' | 'large',
  slug?: string,
  className?: string,
}

interface AvatarGroupProps {
  children?: React.ReactNode,
  spacing?: 'large' | 'small' | 'overlap-small' | 'overlap-large',
  className?: string,
  isInteractive?: boolean,
  direction?: 'vertical' | 'horizontal',
}

export type { AvatarProps }
export type { AvatarGroupProps }