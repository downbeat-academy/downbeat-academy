import * as React from 'react'
import { IconProps } from './types'
import { IconWrapper } from './IconWrapper'

export const CalendarWeek = React.forwardRef<SVGSVGElement, IconProps>(
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
                <path d="M12.6667 2.66667H10.6667V1.33334H9.33333V2.66667H6.66667V1.33334H5.33333V2.66667H3.33333C2.598 2.66667 2 3.26467 2 4V13.3333C2 14.0687 2.598 14.6667 3.33333 14.6667H12.6667C13.402 14.6667 14 14.0687 14 13.3333V4C14 3.26467 13.402 2.66667 12.6667 2.66667ZM3.33333 13.3333V4.66667H12.6667V4L12.668 13.3333H3.33333Z" fill={color} />
                <path d="M4.66663 6.66667V8H11.3333V6H4.66663V6.66667Z" fill={color} />
            </IconWrapper>
        );
    }
)