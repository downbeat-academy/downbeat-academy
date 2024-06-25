import * as React from 'react'
import type { SVGProps } from 'react'
interface SVGRProps {
	title?: string
	titleId?: string
}
const SvgPauseOutline = ({
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
			d="M5.586 4.586A2 2 0 0 1 7 4h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 .586-1.414ZM9 6H7v12h2V6ZM13.586 4.586A2 2 0 0 1 15 4h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V6a2 2 0 0 1 .586-1.414ZM17 6h-2v12h2V6Z"
			clipRule="evenodd"
		/>
	</svg>
)
export default SvgPauseOutline
