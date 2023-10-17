import { SVGProps } from 'react'

interface LogoProps extends SVGProps<SVGElement> {
  color?: 'brand' | 'high-contrast' | 'dark' | 'blueberry' | 'kale' | 'pineapple' | 'peach',
  width?: number,
  className?: string,
}

export type { LogoProps }