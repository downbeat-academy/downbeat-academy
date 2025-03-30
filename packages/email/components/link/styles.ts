export type LinkColor = 
  | 'brand'
  | 'secondary'

const baseStyles = {
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  textDecoration: 'none',
}

const colorStyles = {
  brand: {
    color: '#2723d8', // brand color from design system
  },
  secondary: {
    color: '#323a5c', // faint color from design system
  },
}

export const getLinkStyles = (color: LinkColor = 'brand') => {
  return {
    ...baseStyles,
    ...colorStyles[color],
  }
} 