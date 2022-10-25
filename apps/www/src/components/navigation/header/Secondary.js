import Link from 'next/link';
import { styled, Flex, Paragraph, Button, Badge } from 'cadence-design-system';
import { useUser } from '@auth0/nextjs-auth0';

export const Secondary = () => {
	const { user, error, isLoading } = useUser();

	return (
		<SecondaryWrapper>
			<ContentWrapper>
				<Link href="/about" className="announcement" passHref>
					<BannerLink>
						<Flex direction="row" align="center" gap="5">
							<Badge type="informational">New!</Badge>
							<Paragraph
								context="interface"
								size="small"
								color="$color$blackberry700"
								css={{
									marginBottom: '0',
								}}
							>
								Welcome to Downbeat Academy v2.0 🚀
							</Paragraph>
						</Flex>
					</BannerLink>
				</Link>
				{!user ? (
					<SecondaryActions
						direction="row"
						align="center"
						gap="3"
						className="login-actions"
					>
						<Link href="/for-educators" passHref>
							<Button size="small" variant="ghost" as="a">
								For educators
							</Button>
						</Link>
						<Link href="/api/auth/login" passHref>
							<Button size="small" variant="ghost" as="a">
								Login
							</Button>
						</Link>
					</SecondaryActions>
				) : (
					<SecondaryActions direction="row" align="center" gap="4">
						<Paragraph
							context="interface"
							size="small"
							css={{ marginBottom: '0' }}
						>
							{user.name}
						</Paragraph>
						<Link href="/account" passHref>
							<Button size="small" variant="tertiary" as="a">
								Account
							</Button>
						</Link>
						<Link href="/api/auth/logout" passHref>
							<Button size="small" variant="ghost" as="a">
								Log out
							</Button>
						</Link>
					</SecondaryActions>
				)}
			</ContentWrapper>
		</SecondaryWrapper>
	);
};

const SecondaryWrapper = styled('aside', {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'center',
	alignItems: 'center',
	background: '$grayscale100',
	maxWidth: '100vw',
	borderBottom: '1px solid $grayscale400',

	'@media (max-width: 350px)': {
		'& .announcement-icon': {
			display: 'none',
		},

		'& > *': {
			textAlign: 'center',
		},
	},

	'& .announcement': {
		justifySelf: 'start',
	},
});

const BannerLink = styled('a', {
	textDecoration: 'none',

	'&:hover': {
		cursor: 'pointer',
	},
});

const SecondaryActions = styled(Flex, {
	'@media (max-width: 900px)': {
		display: 'none',
	},
});

const ContentWrapper = styled('div', {
	width: '1600px',
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: '$2 $6',

	'@md': {
		padding: '$2 $5',
	},
});
