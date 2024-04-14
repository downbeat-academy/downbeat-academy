import * as React from 'react'
import type { SVGProps } from 'react'
interface SVGRProps {
	title?: string;
	titleId?: string;
}
const SvgPreviousOutline = ({
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
			d="M20.498 4.133A1 1 0 0 1 21 5v14a1 1 0 0 1-1.504.864l-12-7a1 1 0 0 1 0-1.728l12-7a1 1 0 0 1 1.002-.003ZM9.985 12 19 17.259V6.741L9.985 12ZM4 4a1 1 0 0 1 1 1v14a1 1 0 1 1-2 0V5a1 1 0 0 1 1-1Z"
			clipRule="evenodd"
		/>
	</svg>
)
export default SvgPreviousOutline
