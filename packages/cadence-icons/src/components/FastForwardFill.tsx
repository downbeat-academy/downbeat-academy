import * as React from 'react'
import type { SVGProps } from 'react'
interface SVGRProps {
	title?: string;
	titleId?: string;
}
const SvgFastForwardFill = ({
	title,
	titleId,
	...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		role="img"
		color={props.color}
		aria-labelledby={titleId}
		{...props}
	>
		{title ? <title id={titleId}>{title}</title> : null}
		<path
			fill="currentColor"
			d="M2 5v14c0 .86 1.012 1.318 1.659.753l8-7a1.002 1.002 0 0 0 0-1.506l-8-7C3.012 3.682 2 4.141 2 5M13 5v14c0 .86 1.012 1.318 1.659.753l8-7a1.002 1.002 0 0 0 0-1.506l-8-7C14.012 3.682 13 4.141 13 5"
		/>
	</svg>
)
export default SvgFastForwardFill
