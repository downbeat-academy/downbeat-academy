import classnames from 'classnames'
import s from './logo.module.css'

const colorVariantMap: Record<string, keyof typeof s> = {
  'brand': 'root',
  'high-contrast': 'contrast-high',
  'dark': 'variant-strong',
  'blueberry': 'variant-interactive',
  'kale': 'variant-success',
  'pineapple': 'variant-warning',
  'peach': 'variant-critical'
}

export const getBrandClasses = (color: string , className: string | undefined) => {
  const variantClass = colorVariantMap[color] || 'root'
  return classnames(
    s[variantClass],
    className
  )
}