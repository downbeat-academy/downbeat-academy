import React from 'react';
import Link from 'next/link';
import {
	H1,
	H2,
	H3,
	H4,
	H5,
	H6,
	Paragraph,
	UnorderedList,
	OrderedList,
	Blockquote,
	StyledLink,
	styled,
} from 'cadence-design-system';
import { linkResolver } from '@utils/linkResolver';
import { MainImage } from '@components/content/MainImage';
import {
	InlineChord,
	InlineMusicText,
	MusicNotation,
} from '@/components/content/music-notation';
import { Video } from '@components/content/Video';

export const Components = {
	block: {
		h1: ({ children }) => <H1 context="display">{children}</H1>,
		h2: ({ children }) => <H2 context="display">{children}</H2>,
		h3: ({ children }) => <H3 context="display">{children}</H3>,
		h4: ({ children }) => <H4 context="display">{children}</H4>,
		h5: ({ children }) => <H5 context="display">{children}</H5>,
		h6: ({ children }) => <H6 context="display">{children}</H6>,
		normal: ({ children }) => <Paragraph>{children}</Paragraph>,
		blockquote: ({ children }) => <Blockquote>{children}</Blockquote>,
	},
	list: {
		bullet: ({ children }) => <UnorderedList>{children}</UnorderedList>,
		number: ({ children }) => <OrderedList>{children}</OrderedList>,
	},
	listItem: {
		bullet: ({ children }) => <li>{children}</li>,
		number: ({ children }) => <li>{children}</li>,
	},
	marks: {
		internalLink: ({ children, value }) => (
			<Link href={linkResolver(value.type, value.slug)} passHref>
				<StyledLink style="expressive">{children}</StyledLink>
			</Link>
		),
		link: ({ children, value }) => (
			<StyledLink style="expressive" href={value.href} target="_blank">
				{children}
			</StyledLink>
		),
	},
	types: {
		inlineChord: ({ value }) => <InlineChord input={value} />,
		inlineMusicText: ({ value }) => (
			<InlineMusicText values={value.options} />
		),
		blockquote: ({ value }) => {
			const { attribution, sourceUrl, quote } = value;
			return (
				<Blockquote attribution={attribution} source={sourceUrl}>
					{quote}
				</Blockquote>
			);
		},
		mainImage: ({ value }) => {
			const { alternativeText, caption, image } = value;
			return (
				<MainImage
					image={image}
					alternativeText={alternativeText}
					caption={caption}
				/>
			);
		},
		musicNotation: ({ value }) => <MusicNotation input={value} />,
		video: ({ value }) => <Video input={value} />,
	},
};
