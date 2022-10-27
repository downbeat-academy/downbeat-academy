import { styled } from 'cadence-design-system';

export const GridWrapper = styled('section', {
	display: 'grid',
	gridTemplateColumns: '1fr min(75ch, 100%) 1fr',

	'& > *': {
		gridColumn: '2',
	},
});

export const GridInner = styled('div', {
	padding: '0 $5',
	margin: '$6 0',
	gridColumn: '2',
});
