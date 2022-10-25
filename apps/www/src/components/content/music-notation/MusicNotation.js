import { styled, H4, Paragraph, Flex } from 'cadence-design-system';
import { getSanityUrl } from '@utils/getSanityUrl';
import { RenderSheetMusic } from '@components/content/music-notation';

export const MusicNotation = ({ input }) => {
	const { title, description, file } = input;
	const fileUrl = getSanityUrl(file.asset._ref);

	return (
		<Wrapper>
			<Flex direction="column" gap="$5">
				{title && <H4>{title}</H4>}
				{description && <Paragraph>{description}</Paragraph>}
			</Flex>
			{input.file && <RenderSheetMusic file={fileUrl} />}
		</Wrapper>
	);
};

const Wrapper = styled('section', {
	width: '100ch',
	gridColumn: '1 / span 4',
	margin: '$5 auto $8 auto',
	display: 'flex',
	flexDirection: 'column',
	gap: '$5',
	background: '$blackberry100',
	padding: '$8',

	[`${H4}`]: {
		color: '$passionFruit600',
	},

	'@lg': {
		minWidth: '100%',
		padding: '$5',
	},
});
