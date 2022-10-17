import * as React from 'react'
import { IconProps } from './types'
import { IconWrapper } from './IconWrapper'

export const Play = React.forwardRef<SVGSVGElement, IconProps>(
    ({ color = 'currentColor', size, style, ...props }, forwardedRef) => {
        return (
            <IconWrapper
                size={size}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                color={color}
                css={{
                    '> *': {
                        fill: `${color}`,
                    },
                }}
                {...props}
                ref={forwardedRef}
            >
                <path 
                    d="M5.33334 4.66667H7.33334V11.3333H5.33334V4.66667ZM8.66668 4.66667H10.6667V11.3333H8.66668V4.66667Z" 
                    fill={color}
                />
            </IconWrapper>
        )
    }
)