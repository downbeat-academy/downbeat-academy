import * as React from 'react'
import type { SVGProps } from 'react'
interface SVGRProps {
	title?: string
	titleId?: string
}
const SvgChevronsUp = ({
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
			d="M17.707 18.707a1 1 0 0 1-1.414 0L12 14.414l-4.293 4.293a1 1 0 0 1-1.414-1.414l5-5a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414Z"
			clipRule="evenodd"
		/>
		<path
			fill="currentColor"
			fillRule="evenodd"
			d="M17.707 12.707a1 1 0 0 1-1.414 0L12 8.414l-4.293 4.293a1 1 0 0 1-1.414-1.414l5-5a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1 0 1.414Z"
			clipRule="evenodd"
		/>
	</svg>
)
export default SvgChevronsUp
