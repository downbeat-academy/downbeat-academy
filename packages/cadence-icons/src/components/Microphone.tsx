import * as React from 'react'
import type { SVGProps } from 'react'
interface SVGRProps {
	title?: string;
	titleId?: string;
}
const SvgMicrophone = ({
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
			d="M12 3a2 2 0 0 0-2 2v5a2 2 0 1 0 4 0V5a2 2 0 0 0-2-2ZM8 5a4 4 0 1 1 8 0v5a4 4 0 0 1-8 0V5Z"
			clipRule="evenodd"
		/>
		<path
			fill="currentColor"
			fillRule="evenodd"
			d="M5 9a1 1 0 0 1 1 1 6 6 0 1 0 12 0 1 1 0 1 1 2 0 8 8 0 0 1-16 0 1 1 0 0 1 1-1ZM7 21a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1Z"
			clipRule="evenodd"
		/>
		<path
			fill="currentColor"
			fillRule="evenodd"
			d="M12 16a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0v-4a1 1 0 0 1 1-1Z"
			clipRule="evenodd"
		/>
	</svg>
)
export default SvgMicrophone
