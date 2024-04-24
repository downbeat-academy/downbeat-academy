'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import classnames from 'classnames'
import s from './nav-content.module.scss'
import { LogoLockup } from '@components/brand'
import { Button } from '@components/button'
import { Link } from '@components/link'

const NavContent = ({ links }) => {
	const route = usePathname()

	const [navToggled, setNavToggled] = useState(false)

	const handleNavToggled = () => {
		setNavToggled(!navToggled)
	}

	useEffect(() => setNavToggled(false), [route])

	const staticLinks = [
		{
			text: 'Articles',
			href: '/articles',
		},
		{
			text: 'Handbook',
			href: '/handbook',
		},
		{
			text: 'Jazz Language Lexicon',
			href: '/lexicon',
		},
		{
			text: 'Contributors',
			href: '/contributors',
		},
		{
			text: 'About',
			href: '/about',
		},
		{
			text: 'Contact',
			href: '/contact',
		},
	]

	const mapLinks = staticLinks.map((link) => {
		return (
			<li key={link.text} className={s[`link-item`]}>
				<Link href={link.href} type="secondary">
					{link.text}
				</Link>
			</li>
		)
	})

	const toggledNavClasses = classnames([
		[navToggled ? s['nav-links-wrapper--nav-toggled'] : s['nav-links-wrapper']],
	])

	return (
		<div className={s.root}>
			<div className={s.logo}>
				<Link href="/">
					<LogoLockup width={180} color="brand" />
				</Link>
			</div>
			<div className={toggledNavClasses}>
				<nav>
					<ul className={s[`nav-links`]}>{mapLinks}</ul>
				</nav>
				<div className={s.actions}>
					<Button
						text="Sign up for free"
						variant="primary"
						size="large"
						isFullWidth
					/>
					<Button text="Login" variant="ghost" size="large" isFullWidth />
				</div>
			</div>
			<button
				type="button"
				className={s['menu-button']}
				onClick={handleNavToggled}
			>
				{navToggled ? 'Close menu' : 'Open menu'}
			</button>
		</div>
	)
}

export { NavContent }
