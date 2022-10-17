import * as React from 'react'
import { IconProps } from './types'
import { IconWrapper } from './IconWrapper'

export const Medium = React.forwardRef<SVGSVGElement, IconProps>(
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
                <path d="M2.85667 4.846C2.86435 4.76948 2.85387 4.69222 2.82607 4.62051C2.79826 4.54881 2.75393 4.48468 2.69667 4.43333L1.51667 3.01133V2.798H5.182L8.01533 9.01133L10.506 2.798H14V3.01067L12.99 3.978C12.9477 4.01092 12.9151 4.05457 12.8954 4.10439C12.8757 4.15422 12.8697 4.20841 12.878 4.26133V11.372C12.8695 11.4249 12.8755 11.4792 12.8952 11.529C12.9149 11.5789 12.9476 11.6225 12.99 11.6553L13.976 12.6227V12.8353H9.01867V12.6227L10.038 11.6313C10.1393 11.5313 10.1393 11.5013 10.1393 11.3487V5.60067L7.3 12.812H6.91667L3.61133 5.60067V10.4333C3.584 10.6367 3.65133 10.8413 3.79467 10.9887L5.12267 12.6V12.8127H1.35733V12.6L2.68533 10.9887C2.7552 10.9159 2.80708 10.8277 2.83682 10.7313C2.86657 10.6349 2.87337 10.5328 2.85667 10.4333V4.846Z" fill={color} />
            </IconWrapper>
        );
    }
)