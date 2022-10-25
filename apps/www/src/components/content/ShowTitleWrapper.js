import React from 'react';
import { styled, H1, Divider } from 'cadence-design-system';

export const ShowTitleWrapper = ({ title }) => {
	return (
		<Wrapper>
			<H1 context="display">{title}</H1>
			<Divider css={{ width: '$space$9' }} width={2} />
		</Wrapper>
	);
};

const Wrapper = styled('div', {
	maxWidth: '75ch',
	margin: '0 auto',
	padding: '$8 $5',
});
