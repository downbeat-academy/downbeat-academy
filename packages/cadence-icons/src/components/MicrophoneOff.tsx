import * as React from 'react'
import type { SVGProps } from 'react'
interface SVGRProps {
	title?: string
	titleId?: string
}
const SvgMicrophoneOff = ({
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
			d="M2.293 2.293a1 1 0 0 1 1.414 0l18 18a1 1 0 0 1-1.414 1.414l-18-18a1 1 0 0 1 0-1.414Z"
			clipRule="evenodd"
		/>
		<path
			fill="currentColor"
			fillRule="evenodd"
			d="M12 3a2 2 0 0 0-2 2 1 1 0 0 1-2 0 4 4 0 0 1 8 0v5c0 .395-.058.787-.173 1.165a1 1 0 0 1-1.914-.582A2 2 0 0 0 14 10V5a2 2 0 0 0-2-2ZM9 8.002a1 1 0 0 1 1 1v1a2 2 0 0 0 2.58 1.915 1 1 0 1 1 .58 1.914A3.999 3.999 0 0 1 8 10.002v-1a1 1 0 0 1 1-1Z"
			clipRule="evenodd"
		/>
		<path
			fill="currentColor"
			fillRule="evenodd"
			d="M5 9a1 1 0 0 1 1 1 6 6 0 0 0 9.297 5.014 1 1 0 1 1 1.098 1.672A8 8 0 0 1 4 10a1 1 0 0 1 1-1Zm13.998 0A1 1 0 0 1 20 9.998a7.967 7.967 0 0 1-1.317 4.403 1 1 0 0 1-1.67-1.102A5.967 5.967 0 0 0 18 10.002 1 1 0 0 1 18.998 9ZM7 21a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1Z"
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
export default SvgMicrophoneOff
