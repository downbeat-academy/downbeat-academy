import classnames from 'classnames'
import { Twitter, Facebook, Tiktok, Youtube, Instagram } from 'cadence-icons'
import { Flex, LogoSymbol } from 'cadence-core'
import { Link } from '@components/link'
import { Text } from 'cadence-core'
import s from './footer.module.css'

import type { FooterProps } from './types'

const Footer = ({ className }: FooterProps) => {
	const classes = classnames(s['footer--root'], [className])

	const socialLinks = [
		{
			name: 'Facebook',
			url: 'https://www.facebook.com/DownbeatAcademy',
			icon: <Facebook color="#fff" width={24} />,
		},
		{
			name: 'Twitter',
			url: 'https://twitter.com/DownbeatAcademy',
			icon: <Twitter color="#fff" width={24} />,
		},
		{
			name: 'TikTok',
			url: 'https://tiktok.com/downbeatacademy',
			icon: <Tiktok color="#fff" width={24} />,
		},
		{
			name: 'Instagram',
			url: 'https://instagram.com/downbeatacademy',
			icon: <Instagram color="#fff" width={24} />,
		},
		{
			name: 'YouTube',
			url: 'https://youtube.com/downbeatacademy',
			icon: <Youtube color="#fff" width={24} />,
		},
	]

	const footerLinks = [
		{
			name: 'categories',
			title: 'Categories',
			links: [
				{
					name: 'Articles',
					url: '/articles',
				},
				{
					name: 'Handbook',
					url: '/handbook',
				},
				{
					name: 'Links',
					url: '/links',
				},
			],
		},
		{
			name: 'about',
			title: 'About',
			links: [
				{
					name: 'Mission',
					url: '/mission',
				},
				{
					name: 'About',
					url: '/about',
				},
				{
					name: 'Contributors',
					url: '/contributors',
				},
				{
					name: 'Guest Posting',
					url: '/guest-posting',
				},
				{
					name: 'Advertisers',
					url: '/advertisers',
				},
				{
					name: 'Contact',
					url: '/contact',
				},
				{
					name: 'Newsletter',
					url: '/newsletter',
				},
			],
		},
	]

	return (
		<footer className={classes}>
			<section className={s.logo}>
				<Link href="/">
					<LogoSymbol color="high-contrast" width={64} aria-label="Home link" />
				</Link>
			</section>
			<section className={s[`social-links`]}>
				<ul>
					{socialLinks.map((link) => {
						return (
							<li key={link.name}>
								<Link href={link.url}>{link.icon}</Link>
							</li>
						)
					})}
				</ul>
			</section>
			<Flex tag="nav" direction="row" gap="3x-large">
				{footerLinks.map((title) => {
					return (
						<article className={s[`link-column`]} key={title.name}>
							<Text
								type="productive-body"
								size="body-base"
								color="high-contrast"
								tag="p"
							>
								{title.title}
							</Text>
							<ul>
								{title.links.map((link) => {
									return (
										<Text
											type="productive-body"
											tag="li"
											size="body-small"
											color="high-contrast"
											key={link.name}
										>
											<Link href={link.url} className={s[`high-contrast-link`]}>
												{link.name}
											</Link>
										</Text>
									)
								})}
							</ul>
						</article>
					)
				})}
			</Flex>
			<Flex direction="row" justifyContent="space-between" wrap>
				<Text
					type="productive-body"
					size="body-small"
					color="high-contrast"
					tag="p"
				>
					Copyright &copy; 2023 Downbeat Academy
				</Text>
				<aside className={s[`copyright-links`]}>
					<Flex direction="row" gap="large" wrap>
						<Text tag="p" type="productive-body" size="body-small">
							<Link
								href="/terms-and-conditions"
								className={s[`high-contrast-link`]}
							>
								Terms & Conditions
							</Link>
						</Text>
						<Text tag="p" type="productive-body" size="body-small">
							<Link href="/privacy-policy" className={s[`high-contrast-link`]}>
								Privacy Policy
							</Link>
						</Text>
					</Flex>
				</aside>
			</Flex>
		</footer>
	)
}

export { Footer }
export type { FooterProps }
