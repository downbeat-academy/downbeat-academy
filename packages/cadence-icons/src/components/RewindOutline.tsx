import * as React from 'react'
import type { SVGProps } from 'react'
interface SVGRProps {
	title?: string;
	titleId?: string;
}
const SvgRewindOutline = ({
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
			d="M21.413 4.09A1 1 0 0 1 22 5v14a1 1 0 0 1-1.659.753l-8-7a1 1 0 0 1 0-1.506l8-7a1 1 0 0 1 1.072-.158ZM14.52 12 20 16.796V7.204L14.519 12ZM10.413 4.09A1 1 0 0 1 11 5v14a1 1 0 0 1-1.659.753l-8-7a1 1 0 0 1 0-1.506l8-7a1 1 0 0 1 1.072-.158ZM3.52 12 9 16.796V7.204L3.519 12Z"
			clipRule="evenodd"
		/>
	</svg>
)
export default SvgRewindOutline
