import { styled } from '../../stitches.config';

export const Button = styled('button', {
	fontFamily: '$interfaceBody',
	fontWeight: 700,
	lineHeight: '$interfaceBody',
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'center',
	flexGrow: '0',
	gap: '$4',
	alignSelf: 'flex-start',
	boxSizing: 'border-box',
	border: '1px solid transparent',
	borderRadius: 0,
	transition: '$1',
	textDecoration: 'none',

	'@sm': {
		width: '100%',
	},

	'&:hover': {
		cursor: 'pointer',
	},

	variants: {
		size: {
			large: {
				fontSize: '$interfaceBase',
				padding: '$4 $5',
			},
			medium: {
				fontSize: '$interfaceSmall',
				padding: '$4',
			},
			small: {
				fontSize: '$interfaceExtraSmall',
				padding: '$3 $4',
			},
		},
		variant: {
			primary: {
				background: '$passionFruit600',
				color: '$grayscale100',
				'&:hover': { background: '$passionFruit700' },
				'&:focus': {
					borderColor: '$passionFruit600',
					boxShadow: 'inset 0 0 0 2px $colors$passionFruit600, inset 0 0 0 3px $colors$grayscale100',
				},
				'&:active': { background: '$passionFruit800' },
				':disabled': {
					color: '$grayscale200',
				},
			},
			secondary: {
				background: '$blackberry800',
				color: '$grayscale100',
				'&:hover': { background: '$blackberry900' },
				'&:focus': {
					borderColor: '$blackberry800',
					boxShadow: 'inset 0 0 0 2px $colors$blackberry800, inset 0 0 0 3px $colors$grayscale100',
				},
				'&:active': { background: '$blackberry1000' },
			},
			tertiary: {
				background: '$grayscale100',
				border: 'solid 1px $passionFruit600',
				color: '$passionFruit600',
				'&:hover': {
					background: '$passionFruit700',
					borderColor: '$passionFruit700',
					color: '$grayscale100',
				},
				'&:focus': {
					borderColor: '$passionFruit600',
					boxShadow: 'inset 0 0 0 2px $colors$passionFruit600, inset 0 0 0 3px $colors$grayscale100',
				},
				'&:active': {
					color: '$grayscale100',
					background: '$passionFruit800',
				},
			},
			ghost: {
				background: 'none',
				color: '$passionFruit600',
				'&:hover': { background: '$passionFruit100' },
				'&:focus': {
					borderColor: '$passionFruit600',
					boxShadow: 'inset 0 0 0 2px $colors$passionFruit100, inset 0 0 0 3px $colors$passionFruit600',
				},
				'&:active': { background: 'transparent' },
			},
			destructive: {
				background: '$pomegranate400',
				color: '$grayscale100',
				'&:hover': { background: '$pomegranate500' },
				'&:focus': {
					background: '$pomegranate400',
					boxShadow: 'inset 0 0 0 2px $colors$pomegranate400, inset 0 0 0 3px $colors$grayscale100',
				},
				'&:active': { 
					background: '$pomegranate600'
				},
			},
		},
	},

	defaultVariants: {
		size: 'large',
		variant: 'primary',
	},
});
