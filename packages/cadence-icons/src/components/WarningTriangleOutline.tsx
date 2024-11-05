import * as React from 'react'
import type { SVGProps } from 'react'
interface SVGRProps {
	title?: string;
	titleId?: string;
}
const SvgWarningTriangleOutline = ({
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
			d="M12 9a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1m0 6a1 1 0 0 1 1 1v.01a1 1 0 1 1-2 0V16a1 1 0 0 1 1-1"
			clipRule="evenodd"
		/>
		<path
			fill="currentColor"
			fillRule="evenodd"
			d="M10.466 3.384a3 3 0 0 1 4.144 1.122l7.095 12.243q.035.06.062.126A3 3 0 0 1 19.007 21H5q-.027 0-.054-.002a1 1 0 0 1-.107 0 3 3 0 0 1-2.625-4.124q.026-.065.06-.125L9.37 4.506a3 3 0 0 1 1.096-1.122M4.945 19.002Q4.972 19 5 19h13.996a1 1 0 0 0 .937-1.32L12.875 5.5l-.01-.017a1 1 0 0 0-1.75 0l-.01.017-7.059 12.18A1 1 0 0 0 4.941 19z"
			clipRule="evenodd"
		/>
	</svg>
)
export default SvgWarningTriangleOutline
