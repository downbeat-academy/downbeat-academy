import Link from 'next/link';
import Image from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';
import { sanityConfig } from '@lib/sanityConfig';
import { formatIso } from '@utils/dateHelpers';
import { linkResolver } from '@utils/linkResolver';
import { styled, H5, Paragraph, Flex, Avatar } from 'cadence-design-system';

export const PostCard = ({ postObj }) => {
	const { title, date, image, authors, slug, _type } = postObj;

	const imageProps = useNextSanityImage(sanityConfig, image, {
		blurUpImageQuality: 50,
		blurUpImageWidth: 1200,
		blurUpAmount: 25,
	});

	const authorImageProps = useNextSanityImage(
		sanityConfig,
		authors[0].avatar.image,
		{
			blurUpImageQuality: 50,
			blurUpImageWidth: 1200,
			blurUpAmount: 25,
		}
	);

	return (
		<Link href={linkResolver(_type, slug)} passHref>
			<Wrapper>
				{image && (
					<ImageWrapper>
						<Image
							{...imageProps}
							layout="responsive"
							alt={title}
						/>
					</ImageWrapper>
				)}
				{/* Content Wrapper */}
				<Flex direction="column" gap={5} className="content-wrapper">
					<Flex direction="column" gap="5">
						<H5>{title}</H5>
					</Flex>
					<Flex
						direction="row"
						gap="5"
						align="center"
						css={{
							alignContent: 'center',
						}}
					>
						<Avatar size="small">
							<Image
								{...authorImageProps}
								layout="responsive"
								alt={authors[0].name}
							/>
						</Avatar>
						<Flex direction="column">
							{authors && (
								<Paragraph
									context="interface"
									size="small"
									css={{
										color: '$grayscale700',
										margin: '0',
									}}
								>
									<strong>
										{authors.length > 1
											? authors[0].name +
											  ` and ${
													authors.length - 1
											  } others`
											: authors[0].name}
									</strong>
								</Paragraph>
							)}
							{date && (
								<Paragraph
									context="interface"
									size="extraSmall"
									css={{
										color: '$grayscale700',
										margin: '0',
									}}
								>
									{formatIso(date)}
								</Paragraph>
							)}
						</Flex>
					</Flex>
				</Flex>
			</Wrapper>
		</Link>
	);
};

const Wrapper = styled('a', {
	display: 'flex',
	flexDirection: 'column',
	border: '1px solid $borderDefault',
	textDecoration: 'none',
	transition: '$3',

	'.content-wrapper': {
		flexGrow: '1',
		flexShrink: '1',
		flexBasis: '1',
		transition: '$3',
		padding: '$5',
		background: '$background',
		justifyContent: 'start',
		height: '100%',
	},

	'&:hover': {
		transform: 'translateY(-4px)',
		boxShadow: '0px 4px 16px rgba(0,0,0,0.05)',

		'.content-wrapper': {
			background: '$backgroundInteractive',

			[`${H5}, ${Paragraph}`]: {
				color: '$textInverse',
			},
		},
	},
});

const ImageWrapper = styled('div', {
	width: '100%',
	height: '100%',
});
