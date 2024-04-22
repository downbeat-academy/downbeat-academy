import * as React from 'react'
import type { SVGProps } from 'react'
interface SVGRProps {
	title?: string
	titleId?: string
}
const SvgArrowsSort = ({
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
			d="M18 16.586V5a1 1 0 1 0-2 0v11.586l-2.293-2.293a1 1 0 0 0-1.414 1.414l4 4 .002.002a.997.997 0 0 0 1.412-.002l4-4a1 1 0 0 0-1.414-1.414L18 16.586ZM6 7.414V19a1 1 0 1 0 2 0V7.414l2.293 2.293a1 1 0 0 0 1.414-1.414l-4-4-.002-.002a.997.997 0 0 0-1.412.002l-4 4a1 1 0 0 0 1.414 1.414L6 7.414Z"
			clipRule="evenodd"
		/>
	</svg>
)
export default SvgArrowsSort
