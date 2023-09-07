import { ElementType } from 'react';

interface CardProps {
  children?: React.ReactNode,
  borderColor?: 'none' | 'primary' | 'faint',
  tag?: ElementType,
  className?: string,
}

interface CardImageProps { 
  image?: any,
  alt?: string,
  url?: string,
}

interface CardContentProps {
  children?: React.ReactNode,
  background?: string,
  className?: string,
}

export type { CardProps, CardImageProps, CardContentProps }