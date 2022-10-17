import * as React from 'react'
import { IconProps } from './types'
import { IconWrapper } from './IconWrapper'

export const Check = React.forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', size, ...props }, forwardedRef ) => {
        return (
            <IconWrapper
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                size={size}
                color={color}
                css={{
                    '> *': {
                        fill: `${color}`,
                    },
                }}
                {...props}
                ref={forwardedRef}
            >
                <path fillRule="evenodd" clipRule="evenodd" d="M14.1381 3.52859C14.3984 3.78894 14.3984 4.21105 14.1381 4.4714L6.80475 11.8047C6.5444 12.0651 6.12229 12.0651 5.86194 11.8047L2.52861 8.4714C2.26826 8.21105 2.26826 7.78894 2.52861 7.52859C2.78896 7.26824 3.21107 7.26824 3.47141 7.52859L6.33334 10.3905L13.1953 3.52859C13.4556 3.26824 13.8777 3.26824 14.1381 3.52859Z" fill={color} />
            </IconWrapper>
        )
    }
)