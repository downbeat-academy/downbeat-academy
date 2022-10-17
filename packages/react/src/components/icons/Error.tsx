import * as React from 'react'
import { IconProps } from './types'
import { IconWrapper } from './IconWrapper'

export const Error = React.forwardRef<SVGSVGElement, IconProps>(
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
                <path d="M7.96865 1.33334C4.30998 1.33334 1.33331 4.324 1.33331 8C1.33331 11.676 4.32398 14.6667 7.99998 14.6667C11.676 14.6667 14.6666 11.676 14.6666 8C14.6666 4.324 11.662 1.33334 7.96865 1.33334ZM7.99998 13.3333C5.05931 13.3333 2.66665 10.9407 2.66665 8C2.66665 5.05934 5.04465 2.66667 7.96865 2.66667C10.9273 2.66667 13.3333 5.05934 13.3333 8C13.3333 10.9407 10.9406 13.3333 7.99998 13.3333Z" fill={color} />
                <path d="M7.33337 4.66666H8.66671V9.33333H7.33337V4.66666ZM7.33337 10H8.66671V11.3333H7.33337V10Z" fill={color} />
            </IconWrapper>
        );
    }
)