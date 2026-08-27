import * as React from 'react'
import type { SVGProps } from 'react'
interface SVGRProps {
	title?: string;
	titleId?: string;
}
const SvgArrowBarDown = ({
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
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M12 20V10M12 20l4-4M12 20l-4-4M4 4h16"
		/>
	</svg>
)
export default SvgArrowBarDown
