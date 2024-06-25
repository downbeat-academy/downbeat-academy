import * as React from 'react'
import type { SVGProps } from 'react'
interface SVGRProps {
	title?: string
	titleId?: string
}
const SvgVolumeMute = ({
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
			d="M14.2 7.4a1 1 0 0 1 1.4-.2 6 6 0 0 1 2.294 5.92 1 1 0 1 1-1.964-.373A4 4 0 0 0 14.4 8.8a1 1 0 0 1-.2-1.4Zm2.042 7.429a1 1 0 0 1 0 1.414c-.2.2-.415.387-.642.557a1 1 0 0 1-1.2-1.6 4.01 4.01 0 0 0 .428-.371 1 1 0 0 1 1.414 0Z"
			clipRule="evenodd"
		/>
		<path
			fill="currentColor"
			fillRule="evenodd"
			d="M16.922 4.371a1 1 0 0 1 1.407-.149 10 10 0 0 1 2.624 12.318 1 1 0 0 1-1.782-.908 8 8 0 0 0-2.1-9.854 1 1 0 0 1-.149-1.407Zm2.174 13.31a1 1 0 0 1-.005 1.413c-.242.241-.497.47-.762.684a1 1 0 0 1-1.258-1.556c.213-.172.416-.354.61-.547a1 1 0 0 1 1.415.005ZM10 5.486l-.142.182A1 1 0 0 1 8.28 4.44l.385-.495A1.8 1.8 0 0 1 12 5.067V7a1 1 0 1 1-2 0V5.486Zm-2.092 1.06a1 1 0 0 1 .175 1.404L6.79 9.614A1 1 0 0 1 6 10H4v4h2a1 1 0 0 1 .79.386L10 18.514V11a1 1 0 1 1 2 0v7.933a1.8 1.8 0 0 1-3.335 1.122L5.511 16H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h1.51l.995-1.278a1 1 0 0 1 1.403-.175Z"
			clipRule="evenodd"
		/>
		<path
			fill="currentColor"
			fillRule="evenodd"
			d="M2.293 2.293a1 1 0 0 1 1.414 0l18 18a1 1 0 0 1-1.414 1.414l-18-18a1 1 0 0 1 0-1.414Z"
			clipRule="evenodd"
		/>
	</svg>
)
export default SvgVolumeMute
