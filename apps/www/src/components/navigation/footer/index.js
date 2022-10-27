import Link from 'next/link';
import {
	styled,
	Logo,
	Flex,
	Facebook,
	Instagram,
	YouTube,
	TikTok,
	Twitter,
	Paragraph,
} from 'cadence-design-system';

const socialLinks = [
	{
		name: 'facebook',
		title: 'Facebook',
		url: 'https://facebook.com',
		icon: <Facebook color="$colors$blackberry900" />,
	},
	{
		name: 'instagram',
		title: 'Instagram',
		url: 'https://instagram.com',
		icon: <Instagram color="$colors$blackberry900" />,
	},
	{
		name: 'twitter',
		title: 'Twitter',
		url: 'https://twitter.com',
		icon: <Twitter color="$colors$blackberry900" />,
	},
	{
		name: 'youtube',
		title: 'YouTube',
		url: 'https://youtube.com',
		icon: <YouTube color="$colors$blackberry900" />,
	},
	{
		name: 'tiktok',
		title: 'TikTok',
		url: 'https://tiktok.com',
		icon: <TikTok color="$colors$blackberry900" />,
	},
];

const siteLinks = [
	{
		name: 'categories',
		title: 'Categories',
		links: [
			{
				name: 'blog',
				title: 'Blog',
				url: '/blog',
			},
			{
				name: 'resources',
				title: 'Resources',
				url: '/resources',
			},
			{
				name: 'podcast',
				title: 'Podcast',
				url: '/podcast',
			},
		],
	},
	{
		name: 'about',
		title: 'About',
		links: [
			{
				name: 'mission',
				title: 'Mission',
				url: '/mission',
			},
			{
				name: 'about',
				title: 'About',
				url: '/about',
			},
			{
				name: 'contributors',
				title: 'Contributors',
				url: '/contributors',
			},
			{
				name: 'guest-posting',
				title: 'Guest Posting',
				url: '/guest-posting',
			},
			{
				name: 'advertisers',
				title: 'Advertisers',
				url: '/advertisers',
			},
			{
				name: 'contact',
				title: 'Contact',
				url: '/contact',
			},
		],
	},
];

export const Footer = () => {
	return (
		<Wrapper>
			<ContentWrapper>
				<Logo
					type="symbol"
					color="$colors$blackberry800"
					width="80px"
				/>
				<Flex
					direction="row"
					gap="10"
					justify="between"
					css={{
						'@media (max-width: 768px)': {
							flexDirection: 'column',
							gap: '$6',
						},
					}}
				>
					<SocialLinkWrapper>
						{socialLinks.map((socialLink) => {
							return (
								<SocialLink
									href={socialLink.url}
									key={socialLink.name}
									passhref="true"
								>
									<Flex
										direction="row"
										gap="3"
										align="center"
									>
										{socialLink.icon}
										<span className="link-text">
											{socialLink.title}
										</span>
									</Flex>
								</SocialLink>
							);
						})}
					</SocialLinkWrapper>
					<SiteLinkWrapper>
						{siteLinks.map((category) => {
							return (
								<Flex
									direction="column"
									gap="5"
									key={category.name}
								>
									<Paragraph context="interface" size="small">
										<strong>{category.title}</strong>
									</Paragraph>
									{category.links.map((link) => {
										return (
											<Link
												href={link.url}
												key={link.name}
												passHref
											>
												<LinkWrapper>
													{link.title}
												</LinkWrapper>
											</Link>
										);
									})}
								</Flex>
							);
						})}
					</SiteLinkWrapper>
				</Flex>
				<CopyrightWrapper justify="between">
					<Paragraph
						context="interface"
						size="small"
						css={{ color: '$grayscale700', marginBottom: '0' }}
					>
						Copyright &copy; {new Date().getFullYear()} Downbeat
						Academy, Hype Creative Studios
					</Paragraph>
					<Flex direction="row" gap="8">
						<Link href="/terms-and-conditions" passHref>
							<LinkWrapper
								css={{
									color: '$grayscale700',
									fontSize: '$interfaceSmall',
								}}
							>
								Terms &amp; Conditions
							</LinkWrapper>
						</Link>
						<Link href="/privacy-policy" passHref>
							<LinkWrapper
								css={{
									color: '$grayscale700',
									fontSize: '$interfaceSmall',
								}}
							>
								Privacy Policy
							</LinkWrapper>
						</Link>
					</Flex>
				</CopyrightWrapper>
			</ContentWrapper>
		</Wrapper>
	);
};

const Wrapper = styled('footer', {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'center',
	backgroundColor: '$grayscale100',
});

const ContentWrapper = styled('div', {
	width: '1440px',
	display: 'flex',
	flexDirection: 'column',
	gap: '$8',
	padding: '$8 $6',
	flexWrap: 'wrap',

	'@media (max-width: 768px)': {
		gap: '$8',
		padding: '$8 $4',
	},
});

const LinkWrapper = styled('a', {
	textDecoration: 'none',
	color: 'inherit',

	'&:hover': {
		cursor: 'pointer',
	},
});

const SocialLinkWrapper = styled('aside', {
	display: 'flex',
	flexDirection: 'column',
	gap: '$5',

	'@media (max-width: 768px)': {
		flexDirection: 'row',
	},
});

const SocialLink = styled('a', {
	textDecoration: 'none',

	'.link-text': {
		color: '$blackberry800',
	},

	'@media (max-width: 768px)': {
		'& .link-text': {
			display: 'none',
		},
	},
});

const SiteLinkWrapper = styled('section', {
	display: 'flex',
	flexDirection: 'row',
	flexWrap: 'wrap',
	gap: '$10',
});

const CopyrightWrapper = styled('section', {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
	gap: '$4',

	'@media (max-width: 768px)': {
		flexDirection: 'column-reverse',
		alignItems: 'center',
		textAlign: 'center',
	},
});
