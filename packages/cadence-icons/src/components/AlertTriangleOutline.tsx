import * as React from 'react'
import type { SVGProps } from 'react'
interface SVGRProps {
	title?: string;
	titleId?: string;
}
const SvgAlertTriangleOutline = ({
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
			d="M12 10v2m0 4v.01M5 20h14a2 2 0 0 0 1.84-2.75L13.74 5a2 2 0 0 0-3.5 0l-7.1 12.25A2 2 0 0 0 4.89 20"
		/>
	</svg>
)
export default SvgAlertTriangleOutline
