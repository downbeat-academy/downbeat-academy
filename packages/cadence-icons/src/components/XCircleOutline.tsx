import * as React from 'react'
import type { SVGProps } from 'react'
interface SVGRProps {
	title?: string;
	titleId?: string;
}
const SvgXCircleOutline = ({
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
			d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM10 10l4 4m0-4-4 4"
		/>
	</svg>
)
export default SvgXCircleOutline
