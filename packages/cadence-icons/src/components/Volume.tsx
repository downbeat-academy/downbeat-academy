import * as React from 'react'
import type { SVGProps } from 'react'
interface SVGRProps {
	title?: string;
	titleId?: string;
}
const SvgVolume = ({
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
			d="M14.2 7.4a1 1 0 0 1 1.4-.2 6 6 0 0 1 0 9.6 1 1 0 0 1-1.2-1.6 4 4 0 0 0 0-6.4 1 1 0 0 1-.2-1.4Z"
			clipRule="evenodd"
		/>
		<path
			fill="currentColor"
			fillRule="evenodd"
			d="M16.922 4.371a1 1 0 0 1 1.406-.149 10 10 0 0 1 0 15.556 1 1 0 1 1-1.256-1.556 8 8 0 0 0 0-12.444 1 1 0 0 1-.15-1.407ZM10 5.486 6.79 9.614A1 1 0 0 1 6 10H4v4h2a1 1 0 0 1 .79.386L10 18.514V5.486Zm-.468-2.287A1.8 1.8 0 0 1 12 5.067v13.866a1.8 1.8 0 0 1-3.335 1.122L5.511 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1.51l3.155-4.055a1.8 1.8 0 0 1 .867-.746Z"
			clipRule="evenodd"
		/>
	</svg>
)
export default SvgVolume
