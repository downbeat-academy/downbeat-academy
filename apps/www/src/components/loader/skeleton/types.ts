interface SkeletonLoaderProps {
  count: number
  circle?: boolean
  className?: string
  width?: number | string
  height?: number | string
  borderRadius?: number | string
  inline?: boolean
  duration?: number
  direction?: 'ltr' | 'rtl'
  enableAnimation?: boolean
}

export type { SkeletonLoaderProps }