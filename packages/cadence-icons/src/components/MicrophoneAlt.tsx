import * as React from 'react'
import type { SVGProps } from 'react'
interface SVGRProps {
	title?: string
	titleId?: string
}
const SvgMicrophoneAlt = ({
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
			d="M13.157 2.716a6 6 0 1 1 1.646 11.164 1 1 0 1 1 .398-1.96A4 4 0 1 0 12.08 8.8a1 1 0 1 1-1.96.4 6 6 0 0 1 3.037-6.484Z"
			clipRule="evenodd"
		/>
		<path
			fill="currentColor"
			fillRule="evenodd"
			d="M11.067 8.002a1 1 0 0 1 .74.292l3.902 3.899-.707.707.659.753-8.566 7.495a3 3 0 0 1-4.24-4.244l7.492-8.562a1 1 0 0 1 .72-.34Zm2.472 4.85-2.39-2.389-6.81 7.78-.045.05a1 1 0 1 0 1.413 1.415l.048-.046 7.784-6.81Z"
			clipRule="evenodd"
		/>
	</svg>
)
export default SvgMicrophoneAlt
