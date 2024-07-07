import * as React from 'react'
import type { SVGProps } from 'react'
interface SVGRProps {
	title?: string;
	titleId?: string;
}
const SvgFastForwardOutline = ({
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
			d="M2.587 4.09a1 1 0 0 1 1.071.157l8 7a1 1 0 0 1 0 1.506l-8 7A1 1 0 0 1 2 19V5a1 1 0 0 1 .587-.91ZM4 7.203v9.592L9.481 12 4 7.204ZM13.587 4.09a1 1 0 0 1 1.072.157l8 7a1 1 0 0 1 0 1.506l-8 7A1 1 0 0 1 13 19V5a1 1 0 0 1 .587-.91ZM15 7.203v9.592L20.481 12 15 7.204Z"
			clipRule="evenodd"
		/>
	</svg>
)
export default SvgFastForwardOutline
