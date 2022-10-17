import React from 'react';
import { styled } from '../../stitches.config'

interface Props {
	size?: any;
	icon: string;
	color?: string;
	direction?: any;
}

export function Arrow({
	size = 'small',
	icon,
	color = '#000000',
	direction,
}: Props) {
	function iconRender(icon: string) {
		switch (icon) {
			case 'chevron':
				return (
					<path d="M10.862 6.19533L7.99998 9.05733L5.13798 6.19533L4.19531 7.13799L7.99998 10.9427L11.8046 7.13799L10.862 6.19533Z" />
				);
			case 'chevronSquare':
				return (
					<>
						<path d="M3.33333 14H12.6667C13.402 14 14 13.402 14 12.6667V3.33333C14 2.598 13.402 2 12.6667 2H3.33333C2.598 2 2 2.598 2 3.33333V12.6667C2 13.402 2.598 14 3.33333 14ZM3.33333 3.33333H12.6667L12.6673 12.6667H3.33333V3.33333Z" />
						<path d="M7.99998 9.05733L5.13798 6.19533L4.19531 7.13799L7.99998 10.9427L11.8046 7.13799L10.862 6.19533L7.99998 9.05733Z" />
					</>
				);
			case 'chevronCircle':
				return (
					<>
						<path d="M8.00004 1.33333C4.32404 1.33333 1.33337 4.324 1.33337 8C1.33337 11.676 4.32404 14.6667 8.00004 14.6667C11.676 14.6667 14.6667 11.676 14.6667 8C14.6667 4.324 11.676 1.33333 8.00004 1.33333ZM8.00004 13.3333C5.05937 13.3333 2.66671 10.9407 2.66671 8C2.66671 5.05933 5.05937 2.66666 8.00004 2.66666C10.9407 2.66666 13.3334 5.05933 13.3334 8C13.3334 10.9407 10.9407 13.3333 8.00004 13.3333Z" />
						<path d="M7.99998 9.05733L5.13798 6.19533L4.19531 7.13799L7.99998 10.9427L11.8046 7.13799L10.862 6.19533L7.99998 9.05733Z" />
					</>
				);
			case 'arrow':
				return (
					<path d="M7.19533 1.862L7.19533 11.586L3.66667 8.05733L2.724 9L7.862 14.138L13 9L12.0573 8.05733L8.52867 11.586L8.52867 1.862L7.19533 1.862Z" />
				);
			default:
				return null;
		}
	}

	return (
		<ArrowWrapper
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			size={size}
			color={color}
			direction={direction}
			css={{
				'> *': {
					fill: `${color}`,
				},
			}}
		>
			{iconRender(icon)}
		</ArrowWrapper>
	);
}

const ArrowWrapper = styled('svg', {
	fill: 'none',

	variants: {
		size: {
			extraSmall: {
				width: '1rem',
				height: '1rem',

				'& > *': {
					transform: 'scale(100%)',
				},
			},
			small: {
				width: '1.5rem',
				height: '1.5rem',

				'& > *': {
					transform: 'scale(150%)',
				},
			},
			medium: {
				width: '2rem',
				height: '2rem',

				'& > *': {
					transform: 'scale(200%)',
				},
			},
			large: {
				width: '2.5rem',
				height: '2.5rem',

				'& > *': {
					transform: 'scale(250%)',
				},
			},
		},
		direction: {
			down: { transform: 'inherit' },
			up: { transform: 'rotate(180deg)' },
			left: { transform: 'rotate(90deg)' },
			right: { transform: 'rotate(-90deg)' },
		}
	},
	defaultVariants: {
		size: 'small',
	},
})
