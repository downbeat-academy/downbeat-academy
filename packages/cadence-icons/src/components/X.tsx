import * as React from 'react'
import type { SVGProps } from 'react'
interface SVGRProps {
	title?: string;
	titleId?: string;
}
const SvgX = ({
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
		<g
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			clipPath="url(#x_svg__a)"
		>
			<path d="M18 6 6 18M6 6l12 12" />
		</g>
		<defs>
			<clipPath id="x_svg__a">
				<path fill="#fff" d="M0 0h24v24H0z" />
			</clipPath>
		</defs>
	</svg>
)
export default SvgX
