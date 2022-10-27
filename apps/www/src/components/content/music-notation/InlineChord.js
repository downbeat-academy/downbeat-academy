import React from 'react';
import {
	styled,
	Tooltip,
	TooltipArrow,
	TooltipTrigger,
	TooltipContent,
} from 'cadence-design-system';

export const InlineChord = ({ input }) => {
	const { type, root, quality, seventh, extension, alternateBass } = input;

	const renderExtension = (extension) => {
		switch (extension) {
			case 'flat9':
				return '♭9';
			case 'flat5':
				return '♭5';
			case 'flat13':
				return '♭13';
			case 'sharp9':
				return '♯9';
			case 'sharp11':
				return '♯11';
			case 'major7':
				return '(maj7)';
			case 'sharp9flat9':
				return '♯9/♭9';
			case 'sixNine':
				return '6/9';
			default:
				return null;
		}
	};

	const renderQuality = (quality) => {
		switch (quality) {
			case 'major':
				return 'maj';
			case 'minor':
				return 'min';
			case 'suspended':
				return 'sus4';
			case 'diminished':
				return (
					<>
						<sup></sup>7
					</>
				);
			case 'augmented':
				return 'aug';
			default:
				return null;
		}
	};

	const renderSeventh = (seventh) => {
		switch (seventh) {
			case 'major7':
				return 'maj7';
			case 'dominant7':
				return '7';
			case 'minor7':
				return 'min7';
			case 'halfDiminished7':
				return (
					<>
						<sup>ø</sup>7
					</>
				);
			case 'diminished7':
				return (
					<>
						<sup>o</sup>7
					</>
				);
			default:
				return null;
		}
	};

	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Wrapper>
					{root}
					{type === 'triad' && renderQuality(quality)}
					{type === 'seventh' && renderSeventh(seventh)}
					<sup>
						{type === 'extension' && renderExtension(extension)}
					</sup>
					{alternateBass}
				</Wrapper>
			</TooltipTrigger>
			<TooltipContent
				aria-label={`${root} ${quality !== undefined ? quality : ''} ${
					extension !== undefined ? extension : ''
				}`}
				sideOffset={4}
			>
				<TooltipArrow />
				{`${root} ${quality !== undefined ? quality : ''} ${
					extension !== undefined ? extension : ''
				}`}
			</TooltipContent>
		</Tooltip>
	);
};

const Wrapper = styled('span', {
	display: 'inline-flex',
	padding: '0 $3',
	fontFamily: '$mono',
	background: '$passionFruit100',
	color: '$passionFruit900',
	boxSizing: 'border-box',
	margin: '0 $2',

	'& sup': {
		fontSize: 'calc(1.125 * 0.75)',
		fontFamily: '$musicNotation',
		transform: 'translateY(-2px)',
	},
});
