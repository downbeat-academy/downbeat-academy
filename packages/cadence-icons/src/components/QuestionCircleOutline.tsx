import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
	title?: string;
	titleId?: string;
}
const SvgQuestionCircleOutline = ({
	title,
	titleId,
	...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
	<svg
		width={props.height}
		height={props.height}
		strokeWidth={1.98}
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		color="#000"
		role="img"
		aria-labelledby={titleId}
		{...props}
	>
		{title ? <title id={titleId}>{title}</title> : null}
		<path
			d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
			stroke="#000"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M9 9c0-3.5 5.5-3.5 5.5 0 0 2.5-2.5 2-2.5 5m0 4.01.01-.011"
			stroke="#000"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);
export default SvgQuestionCircleOutline;
