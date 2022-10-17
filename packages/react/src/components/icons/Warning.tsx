import * as React from 'react'
import { IconProps } from './types'
import { IconWrapper } from './IconWrapper'

export const Warning = React.forwardRef<SVGSVGElement, IconProps>(
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
                <path d="M7.33404 6.66667H8.66737V10H7.33404V6.66667ZM7.33337 10.6667H8.66671V12H7.33337V10.6667Z" fill={color} />
                <path d="M9.17867 2.8C8.94667 2.36333 8.49467 2.092 8.00001 2.092C7.50534 2.092 7.05334 2.36333 6.82134 2.80067L1.92934 12.0427C1.82079 12.2456 1.76701 12.4734 1.77333 12.7034C1.77964 12.9335 1.84582 13.158 1.96534 13.3547C2.08314 13.5523 2.25043 13.7157 2.45071 13.8289C2.65098 13.942 2.8773 14.001 3.10734 14H12.8927C13.3647 14 13.792 13.7587 14.0353 13.3547C14.1547 13.1579 14.2207 12.9335 14.2271 12.7034C14.2334 12.4734 14.1797 12.2457 14.0713 12.0427L9.17867 2.8ZM3.10734 12.6667L8.00001 3.42467L12.896 12.6667H3.10734Z" fill={color} />
            </IconWrapper>
        );
    }
)