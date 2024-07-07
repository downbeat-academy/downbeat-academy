import * as React from 'react'
import type { SVGProps } from 'react'
interface SVGRProps {
	title?: string;
	titleId?: string;
}
const SvgNextOutline = ({
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
			d="M3.502 4.133a1 1 0 0 1 1.002.003l12 7a1 1 0 0 1 0 1.728l-12 7A1 1 0 0 1 3 19V5a1 1 0 0 1 .502-.867ZM5 6.74v10.518L14.015 12 5 6.741ZM20 4a1 1 0 0 1 1 1v14a1 1 0 1 1-2 0V5a1 1 0 0 1 1-1Z"
			clipRule="evenodd"
		/>
	</svg>
)
export default SvgNextOutline
