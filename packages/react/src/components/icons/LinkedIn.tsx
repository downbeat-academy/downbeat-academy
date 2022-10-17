import * as React from 'react'
import { IconProps } from './types'
import { IconWrapper } from './IconWrapper'

export const LinkedIn = React.forwardRef<SVGSVGElement, IconProps>(
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
                <path d="M3.322 4.798C4.1276 4.798 4.78067 4.14493 4.78067 3.33933C4.78067 2.53373 4.1276 1.88067 3.322 1.88067C2.5164 1.88067 1.86333 2.53373 1.86333 3.33933C1.86333 4.14493 2.5164 4.798 3.322 4.798Z" fill={color} />
                <path d="M6.158 5.90333V13.996H8.67066V9.994C8.67066 8.938 8.86933 7.91533 10.1787 7.91533C11.47 7.91533 11.486 9.12267 11.486 10.0607V13.9967H14V9.55867C14 7.37867 13.5307 5.70333 10.9827 5.70333C9.75933 5.70333 8.93933 6.37467 8.604 7.01H8.57V5.90333H6.158V5.90333ZM2.06333 5.90333H4.58V13.996H2.06333V5.90333Z" fill={color} />
            </IconWrapper>
        );
    }
)