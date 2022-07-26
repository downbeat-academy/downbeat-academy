import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
	title?: string;
	titleId?: string;
}
const SvgInfoCircleOutline = ({
	title,
	titleId,
	...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
	<svg
		width={props.height}
		height={props.height}
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		role="img"
		aria-labelledby={titleId}
		{...props}
	>
		{title ? <title id={titleId}>{title}</title> : null}
		<g
			clipPath="url(#info-circle-outline_svg__a)"
			stroke="#000"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 8h.01" />
			<path d="M11 12h1v4h1" />
		</g>
		<defs>
			<clipPath id="info-circle-outline_svg__a">
				<path fill="#fff" d="M0 0h24v24H0z" />
			</clipPath>
		</defs>
	</svg>
);
export default SvgInfoCircleOutline;
