import * as React from 'react'
import type { SVGProps } from 'react'
interface SVGRProps {
	title?: string;
	titleId?: string;
}
const SvgPlayOutline = ({
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
			d="M6.512 3.127a1 1 0 0 1 1.012.021l13 8a1 1 0 0 1 0 1.704l-13 8A1 1 0 0 1 6 20V4a1 1 0 0 1 .512-.873ZM8 5.79v12.42L18.092 12 8 5.79Z"
			clipRule="evenodd"
		/>
	</svg>
)
export default SvgPlayOutline
