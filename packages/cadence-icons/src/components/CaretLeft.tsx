import * as React from 'react'
import type { SVGProps } from 'react'
interface SVGRProps {
	title?: string;
	titleId?: string;
}
const SvgCaretLeft = ({
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
			d="M15.383 6.076A1 1 0 0 1 16 7v12a1 1 0 0 1-1.707.707l-6-6a1 1 0 0 1 0-1.414l6-6a1 1 0 0 1 1.09-.217M14 9.414 10.414 13 14 16.586z"
			clipRule="evenodd"
		/>
	</svg>
)
export default SvgCaretLeft
