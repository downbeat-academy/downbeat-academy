export type ContainerBackground = 
  | 'primary'
  | 'faint'
  | 'high-contrast'
  | 'brand'
  | 'interactive'
  | 'success'
  | 'warning'
  | 'critical'

export type ContainerBorderColor = 
  | 'primary'
  | 'faint'
  | 'brand'
  | 'interactive'
  | 'success'
  | 'warning'
  | 'critical'
  | 'high-contrast'

export type ContainerPadding = 
  | 'none'
  | 'small'
  | 'medium'
  | 'large'

const baseStyles = {
  margin: '0 auto',
  borderRadius: '4px',
  width: '100%',
}

const paddingStyles = {
  none: {
    padding: '0',
  },
  small: {
    padding: '16px',
  },
  medium: {
    padding: '20px',
  },
  large: {
    padding: '24px',
  },
}

const backgroundStyles = {
  primary: {
    backgroundColor: '#ffffff',
  },
  faint: {
    backgroundColor: '#F9FAFB',
  },
  'high-contrast': {
    backgroundColor: '#111827',
  },
  brand: {
    backgroundColor: '#EEF2FF',
  },
  interactive: {
    backgroundColor: '#F3F4F6',
  },
  success: {
    backgroundColor: '#ECFDF5',
  },
  warning: {
    backgroundColor: '#FFFBEB',
  },
  critical: {
    backgroundColor: '#FEF2F2',
  },
}

const borderColorStyles = {
  primary: {
    borderColor: '#081034',
  },
  faint: {
    borderColor: '#323a5c',
  },
  brand: {
    borderColor: '#2723d8',
  },
  interactive: {
    borderColor: '#1f7deb',
  },
  success: {
    borderColor: '#33bdb8',
  },
  warning: {
    borderColor: '#e5b400',
  },
  critical: {
    borderColor: '#f7594b',
  },
  'high-contrast': {
    borderColor: '#fff',
  },
}

export const getContainerStyles = (
  background: ContainerBackground = 'primary',
  borderColor: ContainerBorderColor = 'primary',
  padding: ContainerPadding = 'medium'
) => {
  return {
    ...baseStyles,
    ...paddingStyles[padding],
    ...backgroundStyles[background],
    ...borderColorStyles[borderColor],
    borderWidth: '1px',
    borderStyle: 'solid',
  }
} 