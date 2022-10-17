import { styled } from '../../stitches.config';

export const Paragraph = styled('p', {
	color: '$textPrimary',
	textDecoration: 'none',

	'& code': {
		fontFamily: '$mono',
	},

	variants: {
		context: {
			display: {
				fontFamily: '$displayBody',
			},
			interface: {
				fontFamily: '$interfaceBody',
			},
		},
		size: {
			base: {},
			large: {},
			small: {},
			extraSmall: {},
		},
	},

	compoundVariants: [
		{
			context: 'display',
			size: 'extraLarge',
			css: {
				fontSize: '$displayExtraLarge',
				lineHeight: '2.5rem',
				margin: '0 0 2.5rem 0',
			}
		},
		{
			context: 'display',
			size: 'large',
			css: {
				fontSize: '$displayLarge',
				lineHeight: '2.25rem',
				margin: '0 0 2.5rem 0',
			},
		},
		{
			context: 'display',
			size: 'base',
			css: {
				fontSize: '$displayBase',
				lineHeight: '2rem',
				margin: '0 0 2rem 0',
			},
		},
		{
			context: 'display',
			size: 'small',
			css: {
				fontSize: '$displaySmall',
				lineHeight: '1.75rem',
				margin: '0 0 1.75rem 0',
			},
		},
		{
			context: 'interface',
			size: 'extraLarge',
			css: {
				fontSize: '$interfaceExtraLarge',
				lineHeight: '2rem',
				margin: '0 0 2rem 0',
			},
		},
		{
			context: 'interface',
			size: 'large',
			css: {
				fontSize: '$interfaceLarge',
				lineHeight: '2rem',
				margin: '0 0 2rem 0',
			},
		},
		{
			context: 'interface',
			size: 'base',
			css: {
				fontSize: '$interfaceBase',
				lineHeight: '1.5rem',
				margin: '0 0 1.5rem 0',
			},
		},
		{
			context: 'interface',
			size: 'small',
			css: {
				fontSize: '$interfaceSmall',
				lineHeight: '1.5rem',
				margin: '0 0 1.5rem 0',
			},
		},
		{
			context: 'interface',
			size: 'extraSmall',
			css: {
				fontSize: '$interfaceExtraSmall',
				lineHeight: '1rem',
				margin: '0 0 1rem 0',
			},
		},
	],

	defaultVariants: {
		context: 'display',
		size: 'base',
	},
});
