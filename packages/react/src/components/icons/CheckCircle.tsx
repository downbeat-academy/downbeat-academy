import * as React from 'react'
import { IconProps } from './types'
import { IconWrapper } from './IconWrapper'

export const CheckCircle = React.forwardRef<SVGSVGElement, IconProps>(
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
                <path d="M8.00004 1.33334C4.32404 1.33334 1.33337 4.324 1.33337 8C1.33337 11.676 4.32404 14.6667 8.00004 14.6667C11.676 14.6667 14.6667 11.676 14.6667 8C14.6667 4.324 11.676 1.33334 8.00004 1.33334ZM8.00004 13.3333C5.05937 13.3333 2.66671 10.9407 2.66671 8C2.66671 5.05934 5.05937 2.66667 8.00004 2.66667C10.9407 2.66667 13.3334 5.05934 13.3334 8C13.3334 10.9407 10.9407 13.3333 8.00004 13.3333Z" fill={color} />
                <path d="M6.66602 9.058L5.13335 7.528L4.19202 8.472L6.66735 10.942L11.138 6.47133L10.1954 5.52866L6.66602 9.058Z" fill={color} />
            </IconWrapper>
        );
    }
)