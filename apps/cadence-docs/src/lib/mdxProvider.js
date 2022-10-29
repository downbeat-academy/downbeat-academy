import { MDXProvider as Provider } from "@mdx-js/react";
import { Text } from '@downbeat-academy/cadence-core'

const components = {
    h1: ({ children }) => <Text tag='h1' size='6x-large' type='expressive'>{children}</Text>,
    h2: ({ children }) => <Text tag='h2' size='5x-large' type='expressive'>{children}</Text>,
    h3: ({ children }) => <Text tag='h3' size='4x-large' type='expressive'>{children}</Text>,
    h4: ({ children }) => <Text tag='h4' size='3x-large' type='expressive'>{children}</Text>,
    h5: ({ children }) => <Text tag='h5' size='2x-large' type='expressive'>{children}</Text>,
    h6: ({ children }) => <Text tag='h6' size='x-large' type='expressive'>{children}</Text>,
    p: ({ children }) => <Text tag='p' size='base' type='expressive'>{children}</Text>,
}

export const MDXProvider = ({ children }) => {
    return (
        <Provider components={components}>
            {children}
        </Provider>
    )
}