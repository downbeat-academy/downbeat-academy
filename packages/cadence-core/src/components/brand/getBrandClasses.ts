import classnames from 'classnames'
import s from './logo.module.css'

const colorVariantMap: Record<string, keyof typeof s> = {
  'brand': 'cds-logo--root',
  'high-contrast': 'cds-logo--contrast-high',
  'dark': 'cds-logo--variant-strong',
  'blueberry': 'cds-logo--variant-interactive',
  'kale': 'cds-logo--variant-success',
  'pineapple': 'cds-logo--variant-warning',
  'peach': 'cds-logo--variant-critical'
}

export const getBrandClasses = (color: string , className: string | undefined) => {
  const variantClass = colorVariantMap[color] || 'cds-logo--root'
  return classnames(
    s[variantClass],
    className
  )
}