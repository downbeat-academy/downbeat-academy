import { ReactNode } from 'react'

interface AvatarProps {
  imageUrl?: string
  imageObject?: ReactNode
  name?: string
  size?: 'small' | 'medium' | 'large'
  className?: string
}

interface AvatarGroupProps {
  children?: ReactNode
  spacing?: 'large' | 'small' | 'overlap-small' | 'overlap-large'
  className?: string
  direction?: 'vertical' | 'horizontal'
}

export type { AvatarProps }
export type { AvatarGroupProps }
