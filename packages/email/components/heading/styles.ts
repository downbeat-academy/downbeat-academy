import type { TextColor } from '../text/styles'

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

const baseStyles = {
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  margin: '0',
  lineHeight: '1.2',
  fontWeight: '600',
}

const levelStyles = {
  h1: {
    fontSize: '32px',
    marginBottom: '24px',
  },
  h2: {
    fontSize: '28px',
    marginBottom: '20px',
  },
  h3: {
    fontSize: '24px',
    marginBottom: '16px',
  },
  h4: {
    fontSize: '20px',
    marginBottom: '12px',
  },
  h5: {
    fontSize: '18px',
    marginBottom: '12px',
  },
  h6: {
    fontSize: '16px',
    marginBottom: '12px',
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

export const getHeadingStyles = (
  level: HeadingLevel = 'h1',
  color: TextColor = 'primary'
) => {
  return {
    ...baseStyles,
    ...levelStyles[level],
    ...colorStyles[color],
  }
} 