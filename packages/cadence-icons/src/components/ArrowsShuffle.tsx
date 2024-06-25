import * as React from 'react'
import type { SVGProps } from 'react'
interface SVGRProps {
	title?: string
	titleId?: string
}
const SvgArrowsShuffle = ({
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
			d="M17.293 3.293a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414L19.586 7l-2.293-2.293a1 1 0 0 1 0-1.414ZM17.293 13.293a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 0 1-1.414-1.414L19.586 17l-2.293-2.293a1 1 0 0 1 0-1.414Z"
			clipRule="evenodd"
		/>
		<path
			fill="currentColor"
			fillRule="evenodd"
			d="M2 7a1 1 0 0 1 1-1h3a6 6 0 0 1 6 6 4 4 0 0 0 4 4h5a1 1 0 1 1 0 2h-5a6 6 0 0 1-6-6 4 4 0 0 0-4-4H3a1 1 0 0 1-1-1ZM9.8 15.4a1 1 0 0 1-.2 1.4A5.984 5.984 0 0 1 6 18H3a1 1 0 1 1 0-2h3.001a3.983 3.983 0 0 0 2.398-.799 1 1 0 0 1 1.4.2Z"
			clipRule="evenodd"
		/>
		<path
			fill="currentColor"
			fillRule="evenodd"
			d="M12.401 7.198A5.978 5.978 0 0 1 16.001 6H21a1 1 0 1 1 0 2h-5.002a3.978 3.978 0 0 0-2.395.798 1 1 0 1 1-1.202-1.6Z"
			clipRule="evenodd"
		/>
	</svg>
)
export default SvgArrowsShuffle
