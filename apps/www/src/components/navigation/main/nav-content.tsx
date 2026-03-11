'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import classnames from 'classnames'
import { LogoLockup } from 'cadence-core'
import { Link } from '@components/link'
import { Button } from '@components/ui/button'
import s from './nav-content.module.css'
import { signOut } from '@/actions/auth'
import { useFormStatus } from 'react-dom'

// Create a client component for the sign-out button
function SignOutButton() {
	const { pending } = useFormStatus()

	return (
		<Button
			type="submit"
			variant="ghost"
			size="small"
			className={s['sign-out-button']}
			disabled={pending}
		>
			{pending ? "Signing out..." : "Sign Out"}
		</Button>
	)
}

interface NavContentProps {
	links: any
	isAuthenticated: boolean
	isAuthLoading?: boolean
}

const NavContent = ({ links, isAuthenticated, isAuthLoading }: NavContentProps) => {
	const route = usePathname()
	const [navToggled, setNavToggled] = useState(false)
	const [isScrolled, setIsScrolled] = useState(false)

	const authServiceUrl = process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || 'http://localhost:3002'
	const projectUrl = process.env.NEXT_PUBLIC_PROJECT_URL || 'http://localhost:3000'
	const redirectUri = encodeURIComponent(`${projectUrl}${route}`)
	const signInHref = `${authServiceUrl}/sign-in?redirect_uri=${redirectUri}`

	const handleNavToggled = () => {
		setNavToggled(!navToggled)
	}

	const handleSignOut = async () => {
		try {
			await signOut()
		} catch (error) {
			// Sign-out failed
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
				<Link href={link.href} type="secondary" data-testid={`nav-${link.text.toLowerCase().replace(/\s+/g, '-')}`}>
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
				<nav data-testid="main-navigation">
					<ul className={s[`nav-links`]}>
						{mapLinks}
					</ul>
				</nav>
				<div className={s.actions}>
					{isAuthLoading ? null : !isAuthenticated ? (
						<Button
							variant="primary"
							size="large"
							href={signInHref}
							isFullWidth
						>
							Sign in / Sign up
						</Button>
					) : (
						<>
							<form action={handleSignOut}>
								<SignOutButton />
							</form>
							<Button
								size="large"
								variant="primary"
								href="/account"
								isFullWidth
							>
								Account
							</Button>
						</>
					)}
				</div>
			</div>
			<button
				type='button'
				data-testid="mobile-menu-toggle"
				className={s['menu-button']}
				onClick={handleNavToggled}
			>{navToggled ? 'Close menu' : 'Open menu'}</button>
		</div>
	)
}

export { NavContent }
