import * as React from 'react';
import { SVGProps } from 'react';
interface SVGRProps {
	title?: string;
	titleId?: string;
}
const SvgOpenNewWindow = ({
	title,
	titleId,
	...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
	<svg
		width={props.height}
		height={props.height}
		viewBox="0 0 24 24"
		strokeWidth={1.98}
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		color="#000"
		role="img"
		aria-labelledby={titleId}
		{...props}
	>
		{title ? <title id={titleId}>{title}</title> : null}
		<path
			d="M21 3h-6m6 0-9 9m9-9v6"
			stroke="#000"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6"
			stroke="#000"
			strokeLinecap="round"
		/>
	</svg>
);
export default SvgOpenNewWindow;
