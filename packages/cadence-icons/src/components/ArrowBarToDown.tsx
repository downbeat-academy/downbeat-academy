import * as React from 'react'
import type { SVGProps } from 'react'
interface SVGRProps {
	title?: string
	titleId?: string
}
const SvgArrowBarToDown = ({
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
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M4 20h16M12 14V4M12 14l4-4M12 14l-4-4"
		/>
	</svg>
)
export default SvgArrowBarToDown
