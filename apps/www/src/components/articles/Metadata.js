import Link from 'next/link';
import Image from 'next/image';
import { Flex, Paragraph, StyledLink, Avatar } from 'cadence-design-system';
import { linkResolver } from '@utils/linkResolver';
import { formatIso } from '@utils/dateHelpers';
import { getSanityImageUrl } from '@utils/getSanityImageUrl';

export const Metadata = ({ authors, date, lastUpdated }) => {
	const lastAuthor = authors.slice(-1).map((author) => {
		return (
			<Link
				href={linkResolver(author._type, author.slug.current)}
				key={author.name}
				passHref
			>
				<StyledLink>{author.name}</StyledLink>
			</Link>
		);
	});

	const firstAuthors = authors.slice(0, -1).map((author) => {
		return (
			<span key={author.name}>
				<Link
					href={linkResolver(author._type, author.slug.current)}
					passHref
				>
					<StyledLink>{author.name}</StyledLink>
				</Link>
				<span>, &nbsp;</span>
			</span>
		);
	});

	return (
		<Flex
			direction="row"
			justify="between"
			align="center"
			wrap="wrap"
			css={{
				borderColor: '$grayscale300',
				borderWidth: '1px 0',
				borderStyle: 'solid',
				padding: '$5',

				'@md': {
					gap: '$4',
					padding: '$5 0',
					flexDirection: 'column',
					alignItems: 'start',
				},
			}}
		>
			<Flex
				direction="row"
				gap={6}
				align="center"
				wrap="wrap"
				css={{
					'@md': {
						flexDirection: 'column',
						alignItems: 'start',
					},
				}}
			>
				<Flex direction="row" gap={4}>
					{authors &&
						authors.map((author) => {
							return (
								<Link
									href={linkResolver(
										author._type,
										author.slug.current
									)}
									key={author.name}
									passHref
								>
									<a>
										<Avatar size="small" name={author.name}>
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
									</a>
								</Link>
							);
						})}
				</Flex>
				{authors && (
					<Paragraph
						context="display"
						size="small"
						css={{ margin: '0' }}
					>
						<strong>
							By {firstAuthors}
							{lastAuthor}
						</strong>
					</Paragraph>
				)}
			</Flex>
			<Flex
				direction="column"
				align="end"
				css={{
					'@md': {
						alignItems: 'start',
					},
				}}
			>
				{date && (
					<Paragraph
						context="display"
						size="small"
						css={{ margin: '0' }}
					>
						Published on {formatIso(date)}
					</Paragraph>
				)}
				{lastUpdated && (
					<Paragraph
						context="interface"
						size="extraSmall"
						css={{ margin: '0' }}
					>
						<em>Updated on {formatIso(lastUpdated)}</em>
					</Paragraph>
				)}
			</Flex>
		</Flex>
	);
};
