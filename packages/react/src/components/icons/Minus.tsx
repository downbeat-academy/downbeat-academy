import * as React from 'react'
import { IconProps } from './types'
import { IconWrapper } from './IconWrapper'

export const Minus = React.forwardRef<SVGSVGElement, IconProps>(
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
                <path fillRule="evenodd" clipRule="evenodd" d="M2.33334 8C2.33334 7.63181 2.63182 7.33333 3.00001 7.33333H12.3333C12.7015 7.33333 13 7.63181 13 8C13 8.36819 12.7015 8.66667 12.3333 8.66667H3.00001C2.63182 8.66667 2.33334 8.36819 2.33334 8Z" fill={color} />
            </IconWrapper>
        )
    }
)