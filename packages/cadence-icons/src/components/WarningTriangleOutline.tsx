import * as React from 'react'
import type { SVGProps } from 'react'
interface SVGRProps {
	title?: string
	titleId?: string
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
			d="M12 9a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1Zm0 6a1 1 0 0 1 1 1v.01a1 1 0 1 1-2 0V16a1 1 0 0 1 1-1Z"
			clipRule="evenodd"
		/>
		<path
			fill="currentColor"
			fillRule="evenodd"
			d="M10.466 3.384a3 3 0 0 1 4.144 1.122l7.095 12.242c.024.041.044.083.062.127A3 3 0 0 1 19.007 21H5c-.018 0-.036 0-.054-.002a1.005 1.005 0 0 1-.107 0 3 3 0 0 1-2.625-4.124c.017-.043.038-.085.06-.125L9.37 4.505a3 3 0 0 1 1.096-1.122ZM4.945 19.001 5 19h13.996a1 1 0 0 0 .937-1.32L12.875 5.5l-.01-.017a1 1 0 0 0-1.75 0l-.01.017-7.059 12.18A1 1 0 0 0 4.941 19h.004Z"
			clipRule="evenodd"
		/>
	</svg>
)
export default SvgWarningTriangleOutline
