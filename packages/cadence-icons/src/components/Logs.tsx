import * as React from 'react'
import type { SVGProps } from 'react'
interface SVGRProps {
	title?: string;
	titleId?: string;
}
const SvgLogs = ({
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
			d="M4.01 11a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2zM4.01 5a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zM4.01 17a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2zM10 17a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2zM10 11a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2zM10 5a1 1 0 1 1 0 2H8a1 1 0 0 1 0-2zM20 5a1 1 0 1 1 0 2h-6a1 1 0 1 1 0-2zM20 11a1 1 0 1 1 0 2h-6a1 1 0 1 1 0-2zM20 17a1 1 0 1 1 0 2h-6a1 1 0 1 1 0-2z"
		/>
	</svg>
)
export default SvgLogs
