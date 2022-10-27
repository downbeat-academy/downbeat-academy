import React from 'react';
import { styled } from 'cadence-design-system';
import {
	Tooltip,
	TooltipArrow,
	TooltipTrigger,
	TooltipContent,
} from 'cadence-design-system';

export const InlineMusicText = ({ values }) => {
	const renderValues = values.map((value) => {
		switch (value._type) {
			case 'rhythmicValue':
				return <MusicStyle>{value.options}</MusicStyle>;
			case 'accidental':
				return <MusicStyle>{value.options}</MusicStyle>;
			case 'musicText':
				return <span>{value.musicText}</span>;
			case 'clef':
				return <MusicStyle>{value.options}</MusicStyle>;
			case 'barValue':
				return <MusicStyle>{value.options}</MusicStyle>;
			case 'musicSymbol':
				return <MusicStyle>{value.options}</MusicStyle>;
		}
	});

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Wrapper>{renderValues}</Wrapper>
			</TooltipTrigger>
			<TooltipContent aria-label={renderValues} sideOffset={4}>
				<TooltipArrow />
				{renderValues}
			</TooltipContent>
		</Tooltip>
	);
};

const Wrapper = styled('span', {
	display: 'inline-flex',
	gap: '$3',
	padding: '0 $3',
	fontFamily: '$mono',
	background: '$passionFruit100',
	color: '$passionFruit900',
	boxSizing: 'border-box',
	margin: '0 $2',

	sup: {
		fontSize: 'calc(1.125 * 0.75)',
		transform: 'translateY(-2px)',
	},
});

const MusicStyle = styled('span', {
	fontFamily: '$musicNotation',
});
