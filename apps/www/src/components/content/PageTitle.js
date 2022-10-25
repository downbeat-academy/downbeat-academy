import React from 'react';
import { styled, H1, H5, Divider } from 'cadence-design-system';

export const PageTitle = ({ input }) => {
	const { title, subtitle, alignment } = input;

	return (
		<TitleWrapper>
			<Content alignment={alignment}>
				<H5 css={{ color: '$blackberry1000' }} context="display">
					{subtitle}
				</H5>
				<H1 css={{ color: '$passionFruit500' }} context="display">
					{title}
				</H1>
			</Content>
			<Divider />
		</TitleWrapper>
	);
};

const TitleWrapper = styled('section', {
	gridColumn: '1 / 4',
	padding: '$6',

	'@md': {
		padding: '0',
	},
});

const Content = styled('article', {
	width: '85vw',
	padding: '$8 $6',
	display: 'flex',
	flexDirection: 'column',
	gap: '$4',
	margin: '0 auto',

	'@md': {
		maxWidth: '100vw',
		padding: '$6 $4',
	},

	variants: {
		alignment: {
			left: {
				textAlign: 'left',
			},
			center: {
				textAlign: 'center',
			},
			right: {
				textAlign: 'right',
			},
		},
	},
});
