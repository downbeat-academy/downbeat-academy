import { ElementType, HTMLAttributes } from 'react'

interface FlexProps extends HTMLAttributes<HTMLElement> {
  children?: React.ReactNode,
  className?: string,
  tag?: ElementType,
  direction?: 'row' | 'column',
  gap?: 'none' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | '2x-large' | '3x-large',
  padding?: 'none' | 'x-small' | 'small' | 'medium' | 'large' | 'x-large' | '2x-large' | '3x-large',
  alignItems?: 'stretch' | 'start' | 'center' | 'end',
  alignContent?: 'stretch' | 'start' | 'center' | 'end',
  justifyItems?: 'stretch' | 'start' | 'center' | 'end',
  justifyContent?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly',
  wrap?: boolean,
  background?:
  'primary' |
  'faint' |
  'high-contrast' |
  'brand' |
  'interactive' |
  'success' |
  'warning' |
  'critical',
}

export type { FlexProps }