import { baseStyles } from './base'
import { sizeStyles } from './sizes'
import { typeStyles } from './variants'

export type ButtonType = keyof typeof typeStyles
export type ButtonSize = keyof typeof sizeStyles

export const getButtonStyles = (type: ButtonType = 'primary', size: ButtonSize = 'medium') => {
  return {
    ...baseStyles,
    ...sizeStyles[size],
    ...typeStyles[type],
  }
}

export { baseStyles, sizeStyles, typeStyles } 