import { ElementType } from 'react';
import type { FlexProps } from '@components/flex'

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
  background?: FlexProps;
  className?: string,
}

export type { CardProps, CardImageProps, CardContentProps }