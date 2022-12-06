import React from 'react';
import { styled, Flex, H5, Paragraph } from 'cadence-design-system';
import ReactPlayer from 'react-player';

// type Props = {
//     input: {
//         description: string,
//         source: 'muxVideo' | 'url',
//         title: string,
//         url: string,
//         muxVideo: {
//             asset: {
//                 _ref: string
//             }
//         }
//     }
// }

export const Video = ({ input }) => {
	const { description, source, title, url, muxVideo } = input;

	const videoSource = (source) => {
		switch (source) {
			case 'muxVideo':
				return (
					// <SanityMuxPlayer
					// 	assetDocument={muxVideo}
					// 	autoload={true}
					// 	autoplay={false}
					// 	showControls={true}
					// />
					<p>This should be a Mux video.</p>
				);
			case 'url':
				return (
					<ReactPlayer
						url={url}
						controls={true}
						light={true}
						width={'100%'}
					/>
				);
			default:
				return <ReactPlayer url={url} />;
		}
	};

	return (
		<VideoWrapper direction="column" gap="2">
			{videoSource(source)}
			<div className="content">
				<H5 css={{ margin: '0' }} context="display">
					{title}
				</H5>
				<Paragraph size="small" css={{ margin: '0' }} context="display">
					{description}
				</Paragraph>
			</div>
		</VideoWrapper>
	);
};

const VideoWrapper = styled(Flex, {
	gridColumn: '2',
	padding: '$5',
	margin: '$6 0',
	background: '$grayscale200',

	'& .content': {
		display: 'flex',
		flexDirection: 'column',
		gap: '$3',
		padding: '$4 0',
	},
});
