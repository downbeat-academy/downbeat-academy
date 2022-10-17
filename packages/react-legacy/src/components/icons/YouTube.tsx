import * as React from 'react'
import { IconProps } from './types'
import { IconWrapper } from './IconWrapper'

export const YouTube = React.forwardRef<SVGSVGElement, IconProps>(
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
                <path d="M14.6929 4.58854C14.5393 3.96354 14.053 3.46875 13.4644 3.3125C12.3638 3 8.0128 3 8.0128 3C8.0128 3 3.6362 3 2.53565 3.3125C1.94698 3.46875 1.46069 3.96354 1.30713 4.58854C1 5.68229 1 8.02604 1 8.02604C1 8.02604 1 10.3437 1.30713 11.4635C1.46069 12.0885 1.94698 12.5573 2.53565 12.7135C3.6362 13 8.0128 13 8.0128 13C8.0128 13 12.3638 13 13.4644 12.7135C14.053 12.5573 14.5393 12.0885 14.6929 11.4635C15 10.3437 15 8.02604 15 8.02604C15 8.02604 15 5.68229 14.6929 4.58854ZM6.57952 10.1354V5.91667L10.2139 8.02604L6.57952 10.1354Z" fill={color} />
            </IconWrapper>
        );
    }
)