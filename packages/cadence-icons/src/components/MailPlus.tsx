import * as React from 'react'
import type { SVGProps } from 'react'
interface SVGRProps {
	title?: string;
	titleId?: string;
}
const SvgMailPlus = ({
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
			d="M20 12.5V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h7a1 1 0 1 1 0 2H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v5.5a1 1 0 1 1-2 0M22 18a1 1 0 1 1 0 2h-6a1 1 0 1 1 0-2z"
		/>
		<path
			fill="currentColor"
			d="M18 22v-6a1 1 0 1 1 2 0v6a1 1 0 1 1-2 0M20.445 6.168a1 1 0 1 1 1.11 1.664l-9 6a1 1 0 0 1-1.11 0l-9-6a1 1 0 1 1 1.11-1.664L12 11.798z"
		/>
	</svg>
)
export default SvgMailPlus
