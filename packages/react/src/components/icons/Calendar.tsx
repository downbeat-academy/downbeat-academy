import * as React from 'react'
import { IconProps } from './types'
import { IconWrapper } from './IconWrapper'

export const Calendar = React.forwardRef<SVGSVGElement, IconProps>(
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
                <path d="M4.66675 7.33334H6.00008V8.66667H4.66675V7.33334ZM4.66675 10H6.00008V11.3333H4.66675V10ZM7.33341 7.33334H8.66675V8.66667H7.33341V7.33334ZM7.33341 10H8.66675V11.3333H7.33341V10ZM10.0001 7.33334H11.3334V8.66667H10.0001V7.33334ZM10.0001 10H11.3334V11.3333H10.0001V10Z" fill={color} />
                <path d="M3.33333 14.6667H12.6667C13.402 14.6667 14 14.0687 14 13.3333V4C14 3.26467 13.402 2.66667 12.6667 2.66667H11.3333V1.33334H10V2.66667H6V1.33334H4.66667V2.66667H3.33333C2.598 2.66667 2 3.26467 2 4V13.3333C2 14.0687 2.598 14.6667 3.33333 14.6667ZM12.6667 5.33334L12.6673 13.3333H3.33333V5.33334H12.6667Z" fill={color} />
            </IconWrapper>
        );
    }
)