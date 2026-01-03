import classnames from 'classnames'
import s from './logo.module.css'

const colorVariantMap = {
  brand: s.root,
  'high-contrast': s.contrastHigh,
  dark: s.variantStrong,
  blueberry: s.variantInteractive,
  kale: s.variantSuccess,
  pineapple: s.variantWarning,
  peach: s.variantCritical,
} as const

export const getBrandClasses = (color: string, className: string | undefined) => {
  const variantClass = colorVariantMap[color as keyof typeof colorVariantMap] || s.root
  return classnames(
    variantClass,
    className
  )
}