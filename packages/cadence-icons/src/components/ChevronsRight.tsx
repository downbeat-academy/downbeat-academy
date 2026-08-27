import * as React from 'react'
import type { SVGProps } from 'react'
interface SVGRProps {
	title?: string;
	titleId?: string;
}
const SvgChevronsRight = ({
	title,
	titleId,
	...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		color={props.color}
		role={
			title || props['aria-label'] || props['aria-labelledby']
				? 'img'
				: undefined
		}
		aria-hidden={
			title || props['aria-label'] || props['aria-labelledby']
				? undefined
				: true
		}
		aria-labelledby={titleId}
		{...props}
	>
		{title ? <title id={titleId}>{title}</title> : null}
		<path
			fill="currentColor"
			fillRule="evenodd"
			d="M5.793 18.207a1 1 0 0 1 0-1.414l4.293-4.293-4.293-4.293a1 1 0 0 1 1.414-1.414l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0"
			clipRule="evenodd"
		/>
		<path
			fill="currentColor"
			fillRule="evenodd"
			d="M11.793 18.207a1 1 0 0 1 0-1.414l4.293-4.293-4.293-4.293a1 1 0 0 1 1.414-1.414l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0"
			clipRule="evenodd"
		/>
	</svg>
)
export default SvgChevronsRight
