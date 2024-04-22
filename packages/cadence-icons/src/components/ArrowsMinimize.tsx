import * as React from 'react'
import type { SVGProps } from 'react'
interface SVGRProps {
	title?: string
	titleId?: string
}
const SvgArrowsMinimize = ({
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
			d="M9 4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H5a1 1 0 0 1 0-2h3V5a1 1 0 0 1 1-1Z"
			clipRule="evenodd"
		/>
		<path
			fill="currentColor"
			fillRule="evenodd"
			d="M2.293 2.293a1 1 0 0 1 1.414 0l6 6a1 1 0 0 1-1.414 1.414l-6-6a1 1 0 0 1 0-1.414ZM4 15a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0v-3H5a1 1 0 0 1-1-1Z"
			clipRule="evenodd"
		/>
		<path
			fill="currentColor"
			fillRule="evenodd"
			d="M9.707 14.293a1 1 0 0 1 0 1.414l-6 6a1 1 0 0 1-1.414-1.414l6-6a1 1 0 0 1 1.414 0ZM15 4a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z"
			clipRule="evenodd"
		/>
		<path
			fill="currentColor"
			fillRule="evenodd"
			d="M21.707 2.293a1 1 0 0 1 0 1.414l-6 6a1 1 0 0 1-1.414-1.414l6-6a1 1 0 0 1 1.414 0ZM14 15a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-4Z"
			clipRule="evenodd"
		/>
		<path
			fill="currentColor"
			fillRule="evenodd"
			d="M14.293 14.293a1 1 0 0 1 1.414 0l6 6a1 1 0 0 1-1.414 1.414l-6-6a1 1 0 0 1 0-1.414Z"
			clipRule="evenodd"
		/>
	</svg>
)
export default SvgArrowsMinimize
