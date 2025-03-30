export type TextColor = 
  | 'primary'
  | 'secondary'
  | 'muted'
  | 'brand'
  | 'success'
  | 'warning'
  | 'error'

export type TextSize = 
  | 'xs'
  | 'sm'
  | 'base'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'

export type TextWeight = 
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'

const baseStyles = {
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  margin: '0',
  lineHeight: '1.5',
}

const sizeStyles = {
  xs: {
    fontSize: '12px',
  },
  sm: {
    fontSize: '14px',
  },
  base: {
    fontSize: '16px',
  },
  lg: {
    fontSize: '18px',
  },
  xl: {
    fontSize: '20px',
  },
  '2xl': {
    fontSize: '24px',
  },
  '3xl': {
    fontSize: '30px',
  },
  '4xl': {
    fontSize: '36px',
  },
} as const

const weightStyles = {
  normal: {
    fontWeight: '400',
  },
  medium: {
    fontWeight: '500',
  },
  semibold: {
    fontWeight: '600',
  },
  bold: {
    fontWeight: '700',
  },
} as const

const colorStyles = {
  primary: {
    color: '#111827', // gray-900
  },
  secondary: {
    color: '#4B5563', // gray-600
  },
  muted: {
    color: '#6B7280', // gray-500
  },
  brand: {
    color: '#4F46E5', // blueberry-600
  },
  success: {
    color: '#059669', // green-600
  },
  warning: {
    color: '#D97706', // yellow-600
  },
  error: {
    color: '#DC2626', // red-600
  },
} as const

export const getTextStyles = (
  size: TextSize = 'base',
  weight: TextWeight = 'normal',
  color: TextColor = 'primary'
) => {
  return {
    ...baseStyles,
    ...sizeStyles[size],
    ...weightStyles[weight],
    ...colorStyles[color],
  }
} 