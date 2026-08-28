import * as React from 'react'
import type { SVGProps } from 'react'
interface SVGRProps {
	title?: string;
	titleId?: string;
}
const SvgLayout = ({
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
			d="M5 5v6h4V5zm6 6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2zM5 17v2h4v-2zm6 2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2zM15 13v6h4v-6zm6 6a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2zM15 5v2h4V5zm6 2a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2z"
		/>
	</svg>
)
export default SvgLayout
