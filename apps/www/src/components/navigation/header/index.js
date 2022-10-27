import { useState, useEffect } from 'react';
import { styled, Flex, Logo } from 'cadence-design-system';
import Link from 'next/link';

import { Secondary } from './Secondary';
import { Toggle } from './Toggle';
import { NavLinks } from './NavLinks';

export const Header = () => {
	const [navToggled, setNavToggled] = useState(false);
	const [scroll, setScroll] = useState(false);

	const handleNavToggle = () => {
		setNavToggled(!navToggled);
	};

	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', () => {
				setScroll(window.pageYOffset > 100);
			});
		}
	}, []);

	return (
		<>
			<Secondary />
			<HeaderWrapper className={`${scroll ? 'scroll' : ''}`}>
				<Navbar>
					<Flex direction="row" gap="8">
						<Link href="/">
							<a>
								<Logo
									type="lockup"
									color="$passionFruit600"
									width={`${scroll ? '200px' : '250px'}`}
								/>
							</a>
						</Link>
					</Flex>
					<NavLinks viewport="desktop" scroll={scroll} />
					{navToggled && <NavLinks viewport="mobile" />}
					<Toggle handleNavToggle={handleNavToggle}>Menu</Toggle>
				</Navbar>
			</HeaderWrapper>
		</>
	);
};

const Navbar = styled('nav', {
	width: '1600px',
	padding: '$4 $6',
	position: 'sticky',
	top: '0px',
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
	alignItems: 'center',
	transition: '$1',
	background: '$grayscale100',

	'@media (max-width: 900px)': {
		padding: '$4 $6 $4 $4',
	},
});

const HeaderWrapper = styled('header', {
	padding: '0',
	margin: '0',
	position: 'sticky',
	top: '0',
	display: 'flex',
	justifyContent: 'center',
	borderBottom: '1px solid $colors$grayscale400',
	background: '$grayscale100',
	zIndex: '10',

	'&.scroll': {
		boxShadow: '0 1px 40px 0px hsla(240, 36%, 22%, 7.5%)',

		[`${Navbar}`]: {
			padding: '$3 $6',
		},
	},
});
