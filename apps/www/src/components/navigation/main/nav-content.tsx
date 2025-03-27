'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import classnames from 'classnames'
import { LogoLockup } from 'cadence-core'
import { Button } from '@components/button'
import { Link } from '@components/link'
import s from './nav-content.module.scss'
import { signOut } from '@/actions/auth'
import { useFormStatus } from 'react-dom'

// Create a client component for the sign-out button
function SignOutButton() {
	const { pending } = useFormStatus()
	
	return (
		<Button
			type="submit"
			text={pending ? "Signing out..." : "Sign Out"}
			variant="ghost"
			size="small"
			className={s['sign-out-button']}
			disabled={pending}
		/>
	)
}

const NavContent = ({ links, session }) => {
	const route = usePathname()
	const [navToggled, setNavToggled] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)

	const handleNavToggled = () => {
		setNavToggled(!navToggled)
	}

	const handleSignOut = async () => {
		try {
			await signOut()
		} catch (error) {
			window.dispatchEvent(new Event('auth-event'))
		}
	}

	useEffect(() => {
		const handleScroll = () => {
			const scrollPosition = window.scrollY
			setIsScrolled(scrollPosition > 0)
		}

		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	useEffect(() => {
		if (navToggled) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'unset'
		}
		return () => {
			document.body.style.overflow = 'unset'
		}
	}, [navToggled])

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

	const rootClasses = classnames(s.root, {
		[s.scrolled]: isScrolled
	})

	return (
		<div className={rootClasses}>
			<div className={s.logo}>
				<Link href="/">
					<LogoLockup width={180} color='brand' />
				</Link>
			</div>
			<div className={toggledNavClasses}>
				<nav>
					<ul className={s[`nav-links`]}>
						{mapLinks}
					</ul>
				</nav>
				<div className={s.actions}>
					{!session?.data?.session ? (
						<Button
							text="Sign in / Sign up"
							variant="primary"
							size="large"
							href="/sign-in"
							isFullWidth
						/>
					) : (
						<>
							<form action={handleSignOut}>
								<SignOutButton />
							</form>
							<Button
								text="Account"
								size="large"
								variant="primary"
								href="/account"
								isFullWidth
							/>
						</>
					)}
				</div>
			</div>
			<button
				type='button'
				className={s['menu-button']}
				onClick={handleNavToggled}
			>{navToggled ? 'Close menu' : 'Open menu'}</button>
		</div>
	)
}

export { NavContent }
