import Image from 'next/image';
import Link from 'next/link';
import {
	styled,
	H2,
	Paragraph,
	Badge,
	Avatar,
	Flex,
} from 'cadence-design-system';
import { getSanityImageUrl } from '@utils/getSanityImageUrl';
import { linkResolver } from '@utils/linkResolver';
import { formatIso } from '@utils/dateHelpers';
import { useNextSanityImage } from 'next-sanity-image';
import { sanityConfig } from '@lib/sanityConfig';

export const FeaturedContent = ({ featuredObj }) => {
	const { title, authors, categories, image, _type, excerpt, slug, date } =
		featuredObj;

	const featuredImageProps = useNextSanityImage(sanityConfig, image, {
		blurUpImageWidth: 100,
		blueUpImageQuality: 40,
		blurUpAmount: 24,
	})

	return (
		<Wrapper>
			<ImageWrapper>
				<Image
					src={featuredImageProps.src}
					loader={featuredImageProps.loader}
					layout="fill"
					objectFit="cover"
					quality={90}
					alt={title}
				/>
			</ImageWrapper>
			<Flex direction="column" gap="5" justify="center" align="start">
				<Paragraph
					css={{ marginBottom: '0' }}
					context="interface"
					size="small"
				>
					{formatIso(date)}
				</Paragraph>
				<Flex direction="row" gap="3">
					{categories.map((category) => (
						<Badge type="informational" key={category.title}>
							{category.title}
						</Badge>
					))}
				</Flex>
				<Link href={linkResolver(_type, slug)} passHref>
					<LinkWrapper>
						<H2
							context="display"
							as="h1"
							css={{
								color: '$passionFruit600',
								lineHeight: '1.2',
							}}
						>
							{title}
						</H2>
					</LinkWrapper>
				</Link>
				<Paragraph context="display" css={{ marginBottom: '0' }}>
					{excerpt}
				</Paragraph>
				{authors.map((author) => (
					<Flex
						direction="row"
						align="center"
						gap="5"
						key={author._id}
					>
						<Avatar size="small">
							<Image
								src={getSanityImageUrl(
									author.avatar.image.asset
								)}
								layout="responsive"
								width={40}
								height={40}
								quality={90}
								alt={author.name}
							/>
						</Avatar>
						<Paragraph
							context="interface"
							css={{ marginBottom: '0' }}
						>
							<strong>{author.name}</strong>
						</Paragraph>
					</Flex>
				))}
			</Flex>
		</Wrapper>
	);
};

const Wrapper = styled('section', {
	display: 'grid',
	gap: '$10',
	gridTemplateColumns: 'repeat(2, 1fr)',
	background: '$blueberry100',
	padding: '$10',
	minHeight: '75vh',

	'@lg': {
		gridTemplateColumns: '1fr',
		gridTemplateRows: 'repeat(2, 1fr)',
		gap: '$8',
		padding: '$8',
	},

	'@md': {
		padding: '$5',
	},
});

const LinkWrapper = styled('a', {
	textDecoration: 'none',
	textDecorationColor: '$passionFruit600',
	transition: '$2',

	'&:hover': {
		textDecoration: 'underline',
		textDecorationColor: '$passionFruit600',
		textDecorationThickness: '$space$2',
		textUnderlineOffset: '$space$2',
	},
});

const ImageWrapper = styled('div', {
	width: '100%',
	minHeight: '100%',
	position: 'relative',
});
