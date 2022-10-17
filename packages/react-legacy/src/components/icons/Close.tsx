import * as React from 'react'
import { IconProps } from './types'
import { IconWrapper } from './IconWrapper'

export const Close = React.forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', size, ...props }, forwardedRef) => {
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
                <path d="M10.7946 4.22933L7.96598 7.05733L5.13798 4.22933L4.19531 5.172L7.02331 8L4.19531 10.828L5.13798 11.7707L7.96598 8.94267L10.7946 11.7707L11.7373 10.828L8.90931 8L11.7373 5.172L10.7946 4.22933Z" fill={color} />
            </IconWrapper>
        );
    }
)