import Image from 'next/image';
import {
	parseAssetId,
	buildImageUrl,
	getImageDimensions,
} from '@sanity/asset-utils';
import { styled, Paragraph } from 'cadence-design-system';
import { sanityConfig } from '@lib/sanityConfig';

export const MainImage = ({
	alternativeText,
	caption,
	image,
	quality = '90',
}) => {
	const getImageUrl = buildImageUrl(
		parseAssetId(image.asset._ref),
		sanityConfig
	);
	const dimensions = getImageDimensions(image.asset._ref);

	return (
		<Wrapper>
			<Image
				src={getImageUrl}
				width={dimensions.width}
				height={dimensions.height}
				alt={alternativeText}
				quality={quality}
			/>
			{caption && (
				<CaptionWrapper>
					<Paragraph size="extraSmall" context="interface">
						{caption}
					</Paragraph>
				</CaptionWrapper>
			)}
		</Wrapper>
	);
};

const Wrapper = styled('section', {
	display: 'flex',
	flexDirection: 'column',
	gap: '0',
	marginBottom: '$5',
});

const CaptionWrapper = styled('aside', {
	padding: '$3 $6',
	background: '$blackberry800',

	[`${Paragraph}`]: {
		color: '$grayscale100',
		margin: '0',
	},
});
