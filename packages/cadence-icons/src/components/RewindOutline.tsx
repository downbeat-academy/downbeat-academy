import * as React from 'react'
import type { SVGProps } from 'react'
interface SVGRProps {
	title?: string;
	titleId?: string;
}
const SvgRewindOutline = ({
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
			fillRule="evenodd"
			d="M21.413 4.09A1 1 0 0 1 22 5v14a1 1 0 0 1-1.658.753l-8-7a1 1 0 0 1 0-1.506l8-7a1 1 0 0 1 1.071-.158M14.52 12 20 16.796V7.204zM10.413 4.09A1 1 0 0 1 11 5v14a1 1 0 0 1-1.658.753l-8-7a1 1 0 0 1 0-1.506l8-7a1 1 0 0 1 1.071-.158M3.52 12 9 16.796V7.204z"
			clipRule="evenodd"
		/>
	</svg>
)
export default SvgRewindOutline
