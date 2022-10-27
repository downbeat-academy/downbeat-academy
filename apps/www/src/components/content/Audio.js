import React from 'react';
import { styled, Flex, Paragraph, H5 } from 'cadence-design-system';
import { buildFileUrl, parseAssetId } from '@sanity/asset-utils';
import { sanityConfig } from '@lib/sanityConfig';

export const Audio = ({ input }) => {
	const { description, download, file, title } = input;

	const audioParts = parseAssetId(file.asset._ref);

	const getAudio = buildFileUrl(audioParts, sanityConfig);

	return (
		<AudioWrapper direction="column" gap="2">
			<H5 context="display" css={{ marginBottom: '0' }}>
				{title}
			</H5>
			<Paragraph size="small" css={{ marginBottom: '0' }}>
				{description}
			</Paragraph>
			<audio controls src={getAudio}>
				Audio
			</audio>
		</AudioWrapper>
	);
};

const AudioWrapper = styled(Flex, {
	gridColumn: '2',
	padding: '$8 $6',
	margin: '$6 0',
	background: '$grayscale200',
});
