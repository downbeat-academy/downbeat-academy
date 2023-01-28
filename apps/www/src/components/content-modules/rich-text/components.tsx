import { Text } from 'cadence-core'

const components = {
  block: {
    h1: ({ children }) => <Text tag='h1' size='6x-large' type='expressive' category='headline' color='primary'>{children}</Text>,
    h2: ({ children }) => <Text tag='h2' size='5x-large' type='expressive' category='headline' color='primary'>{children}</Text>,
    h3: ({ children }) => <Text tag='h3' size='4x-large' type='expressive' category='headline' color='primary'>{children}</Text>,
    h4: ({ children }) => <Text tag='h4' size='3x-large' type='expressive' category='headline' color='primary'>{children}</Text>,
    h5: ({ children }) => <Text tag='h5' size='2x-large' type='expressive' category='headline' color='primary'>{children}</Text>,
    h6: ({ children }) => <Text tag='h6' size='x-large' type='expressive' category='headline' color='primary'>{children}</Text>,
    normal: ({ children }) => <Text tag='p' size='large' type='expressive' category='body' color='primary'>{children}</Text>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>
  },
  list: {},
  listItem: {},
  types: {},
  marks: {},
}

export { components }