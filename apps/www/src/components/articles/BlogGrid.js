import { styled } from 'cadence-design-system';

export const BlogGrid = styled('div', {
	maxWidth: '1600px',
	margin: '0 auto',
	padding: '$8 $10',
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
	gap: '$8',

	'@lg': {
		padding: '$8',
	},

	'@md': {
		padding: '$8 $5',
	},
});
