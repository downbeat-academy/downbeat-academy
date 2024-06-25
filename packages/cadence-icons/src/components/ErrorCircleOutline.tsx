import * as React from 'react'
import type { SVGProps } from 'react'
interface SVGRProps {
	title?: string
	titleId?: string
}
const SvgErrorCircleOutline = ({
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
			d="M8.173 2.761a10 10 0 1 1 7.654 18.478A10 10 0 0 1 8.173 2.761ZM12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z"
			clipRule="evenodd"
		/>
		<path
			fill="currentColor"
			fillRule="evenodd"
			d="M12 8a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1ZM12 15a1 1 0 0 1 1 1v.01a1 1 0 1 1-2 0V16a1 1 0 0 1 1-1Z"
			clipRule="evenodd"
		/>
	</svg>
)
export default SvgErrorCircleOutline
