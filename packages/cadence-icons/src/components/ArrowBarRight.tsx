import * as React from 'react'
import type { SVGProps } from 'react'
interface SVGRProps {
	title?: string;
	titleId?: string;
}
const SvgArrowBarRight = ({
	title,
	titleId,
	...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		role="img"
		aria-labelledby={titleId}
		{...props}
	>
		{title ? <title id={titleId}>{title}</title> : null}
		<path
			stroke={props.color}
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M20 12H10M20 12l-4 4M20 12l-4-4M4 4v16"
		/>
	</svg>
)
export default SvgArrowBarRight
