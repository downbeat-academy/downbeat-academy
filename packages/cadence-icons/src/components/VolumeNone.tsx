import * as React from 'react'
import type { SVGProps } from 'react'
interface SVGRProps {
	title?: string;
	titleId?: string;
}
const SvgVolumeNone = ({
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
			d="M10 5.486 6.79 9.614A1 1 0 0 1 6 10H4v4h2a1 1 0 0 1 .79.386L10 18.514zm-.468-2.287A1.8 1.8 0 0 1 12 5.067v13.866a1.8 1.8 0 0 1-3.335 1.122L5.511 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1.51l3.155-4.055a1.8 1.8 0 0 1 .867-.746M15.293 9.293a1 1 0 0 1 1.414 0L18 10.586l1.293-1.293a1 1 0 1 1 1.414 1.414L19.414 12l1.293 1.293a1 1 0 0 1-1.414 1.414L18 13.414l-1.293 1.293a1 1 0 0 1-1.414-1.414L16.586 12l-1.293-1.293a1 1 0 0 1 0-1.414"
			clipRule="evenodd"
		/>
	</svg>
)
export default SvgVolumeNone
