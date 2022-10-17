import * as React from 'react'
import { IconProps } from './types'
import { IconWrapper } from './IconWrapper'

export const Facebook = React.forwardRef<SVGSVGElement, IconProps>(
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
                <path d="M16 8.04868C16 3.60243 12.4194 0 8 0C3.58065 0 0 3.60243 0 8.04868C0 12.073 2.90323 15.4158 6.74194 16V10.3854H4.70968V8.04868H6.74194V6.29615C6.74194 4.28398 7.93548 3.14807 9.74194 3.14807C10.6452 3.14807 11.5484 3.31034 11.5484 3.31034V5.29006H10.5484C9.54839 5.29006 9.22581 5.90669 9.22581 6.55578V8.04868H11.4516L11.0968 10.3854H9.22581V16C13.0645 15.4158 16 12.073 16 8.04868Z" fill={color} />
            </IconWrapper>
        );
    }
)