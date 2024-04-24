import * as React from 'react'
import type { SVGProps } from 'react'
interface SVGRProps {
	title?: string
	titleId?: string
}
const SvgCaretUp = ({
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
			d="M18.924 16.383A1 1 0 0 1 18 17H6a1 1 0 0 1-.707-1.707l6-6a1 1 0 0 1 1.414 0l6 6a1 1 0 0 1 .217 1.09ZM15.586 15 12 11.414 8.414 15h7.172Z"
			clipRule="evenodd"
		/>
	</svg>
)
export default SvgCaretUp
