import * as React from 'react'
import type { SVGProps } from 'react'
interface SVGRProps {
	title?: string
	titleId?: string
}
const SvgCaretRight = ({
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
			d="M8.617 19.924A1 1 0 0 1 8 19V7a1 1 0 0 1 1.707-.707l6 6a1 1 0 0 1 0 1.414l-6 6a1 1 0 0 1-1.09.217ZM10 16.586 13.586 13 10 9.414v7.172Z"
			clipRule="evenodd"
		/>
	</svg>
)
export default SvgCaretRight
