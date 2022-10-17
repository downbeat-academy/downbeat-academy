import { styled } from '../../stitches.config';

export const Link = styled('a', {
	fontFamily: '$interfaceBody',
	fontWeight: 400,
	lineHeight: '$interfaceBody',
	transition: '$1',
	textDecoration: 'underline',
	color: '$passionFruit600',

	'&:hover': {
		cursor: 'pointer',
		color: '$passionFruit700'
	},

	'&:focus': { color: '$passionFruit800' },

	variants: {
		context: {
			inline: { display: 'inline' },
			block: { display: 'flex' }
		}
	}
});
