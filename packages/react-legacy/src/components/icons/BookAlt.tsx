import * as React from 'react'
import { IconProps } from './types'
import { IconWrapper } from './IconWrapper'

export const BookAlt = React.forwardRef<SVGSVGElement, IconProps>(
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
                <path d="M12.6667 1.33334H4C3.196 1.33334 2 1.866 2 3.33334V12.6667C2 14.134 3.196 14.6667 4 14.6667H14V13.3333H4.008C3.7 13.3253 3.33333 13.204 3.33333 12.6667C3.33333 12.1293 3.7 12.008 4.008 12H14V2.66667C14 1.93134 13.402 1.33334 12.6667 1.33334ZM12.6667 10.6667H3.33333V3.33334C3.33333 2.796 3.7 2.67467 4 2.66667H12.6667V10.6667Z" fill={color} />
            </IconWrapper>
        );
    }
)