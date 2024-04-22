import * as React from 'react'
import type { SVGProps } from 'react'
interface SVGRProps {
	title?: string
	titleId?: string
}
const SvgCaretDown = ({
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
			d="M5.076 9.617A1 1 0 0 1 6 9h12a1 1 0 0 1 .707 1.707l-6 6a1 1 0 0 1-1.414 0l-6-6a1 1 0 0 1-.217-1.09ZM8.414 11 12 14.586 15.586 11H8.414Z"
			clipRule="evenodd"
		/>
	</svg>
)
export default SvgCaretDown
