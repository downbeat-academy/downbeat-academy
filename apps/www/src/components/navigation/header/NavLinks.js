import Link from 'next/link';
import { styled } from 'cadence-design-system';
import { Button } from '@downbeat-academy/cadence-core';
import { useUser } from '@auth0/nextjs-auth0';

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
						<Link href="/for-educators" passHref>
							<Button text="For Educators" variant='primary'/>
						</Link>
						<Link href="/api/auth/login" passHref>
							<Button text='Sign in' variant='secondary' />
						</Link>
					</>
				)}
				{!user ? (
					<Link href="/api/auth/login" passHref>
						<Button text='Join for free' variant='primary' />
					</Link>
				) : null}
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
