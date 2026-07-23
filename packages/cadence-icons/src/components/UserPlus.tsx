import * as React from 'react'
import type { SVGProps } from 'react'
interface SVGRProps {
	title?: string;
	titleId?: string;
}
const SvgUserPlus = ({
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
			d="M15 7a3 3 0 1 0-6 0 3 3 0 0 0 6 0m2 0a5 5 0 1 1-10-.001A5 5 0 0 1 17 7M22 18a1 1 0 1 1 0 2h-6a1 1 0 1 1 0-2z"
		/>
		<path
			fill="currentColor"
			d="M18 22v-6a1 1 0 1 1 2 0v6a1 1 0 1 1-2 0M5 21v-2a5 5 0 0 1 5-5h4a1 1 0 1 1 0 2h-4a3 3 0 0 0-3 3v2a1 1 0 1 1-2 0"
		/>
	</svg>
)
export default SvgUserPlus
