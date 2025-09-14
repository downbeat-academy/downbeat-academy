import type { TextProps } from 'cadence-core'

type SummaryProps = {
  title: {
    text: string,
    type?: TextProps['type'],
    tag?: TextProps['tag'],
    size?: TextProps['size'],
    color?: TextProps['color'],
  },
  isOpen?: boolean,
  type?: 'contained' | 'flush',
  size?: 'small' | 'medium' | 'large',
  maxWidth?: string,
  children?: React.ReactNode,
  className?: string,
}

export type { SummaryProps }