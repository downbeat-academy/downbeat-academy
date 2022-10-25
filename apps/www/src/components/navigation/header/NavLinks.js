import Link from 'next/link';
import { styled, Button } from 'cadence-design-system';
import { useUser } from '@auth0/nextjs-auth0'

export const NavLinks = ({ viewport, scroll }) => {

	const { user } = useUser();
	
	return (
		<NavLinksWrapper viewport={viewport}>
			<Links>
				<Link href="/articles" passHref>
					<StyledLink>Articles</StyledLink>
				</Link>
				<Link href="/about" passHref>
					<StyledLink>About</StyledLink>
				</Link>
				<Link href="/contact" passHref>
					<StyledLink>Contact</StyledLink>
				</Link>
			</Links>
			<AccountActions>
				{viewport === 'mobile' && (
					<>
						<Link href="#" passHref>
							<Button size="large" variant="ghost" as="a">
								For educators
							</Button>
						</Link>
						<Link href="/sign-in" passHref>
							<Button size="large" variant="tertiary" as="a">
								Sign in
							</Button>
						</Link>
					</>
				)}
				{!user ? (
					<Link href="/sign-up" passHref>
						<Button
							size={`${scroll ? 'medium' : 'large'}`}
							variant="primary"
							as="a"
							onClick='fathom.trackGoal("BS0TJPWH", 0)'
						>
							Join for free
						</Button>
					</Link>
					) : null				
				}
			</AccountActions>
		</NavLinksWrapper>
	);
};

const Links = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	gap: '$5',

	'@media (max-width: 900px)': {
		gap: '$1',
	},
});

const AccountActions = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	gap: '$5',
	textAlign: 'center',
});

const NavLinksWrapper = styled('div', {
	variants: {
		viewport: {
			mobile: {
				width: '100%',
				height: 'calc(100vh - 102px)',
				position: 'absolute',
				top: '70px',
				left: '0px',
				display: 'flex',
				flexDirection: 'column',
				background: '$grayscale100',
				padding: '$6',
				justifyContent: 'space-between',
				boxSizing: 'border-box',
			},
			desktop: {
				position: 'relative',
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				gap: '$6',

				[`& ${Links}`]: {
					flexDirection: 'row',
				},

				[`& ${AccountActions}`]: {
					flexDirection: 'row',
				},

				'@media (max-width: 900px)': {
					display: 'none',
				},
			},
		},
	},
});

const StyledLink = styled('a', {
	fontFamily: '$interfaceBody',
	fontSize: '$interfaceBase',
	color: '$blackberry1000',
	transition: '$1',
	textDecoration: 'none',

	'&:hover': {
		color: '$passionFruit600',
		cursor: 'pointer',
	},

	'@media (max-width: 900px)': {
		padding: '$4',

		'&:hover': {
			background: '$passionFruit000',
		},
	},
});
