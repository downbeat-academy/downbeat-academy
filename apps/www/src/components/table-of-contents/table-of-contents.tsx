'use client'

import { useEffect, useState, useMemo, useSyncExternalStore } from 'react'
import classnames from 'classnames'
import { Text } from 'cadence-core'
import { Link } from '@components/link'
import { slugify } from '@utils/slugify'
import s from './table-of-contents.module.css'

interface Heading {
	id: string
	text: string
	level: number
}

interface TableOfContentsProps {
	content: any // Portable Text content
	title: string
	className?: string
}

function subscribeToWindowResize(callback: () => void) {
	window.addEventListener('resize', callback)
	return () => window.removeEventListener('resize', callback)
}

const TableOfContents = ({
	content,
	title,
	className,
}: TableOfContentsProps) => {
	const [activeId, setActiveId] = useState<string>('')
	const [manualExpanded, setManualExpanded] = useState<boolean | null>(null)

	// Detects client-side mount without state-in-effect: false on server, true on client
	const hasMounted = useSyncExternalStore(
		() => () => {},
		() => true,
		() => false,
	)

	// Viewport-based expansion — auto-syncs with window.innerWidth via subscription
	const isWideViewport = useSyncExternalStore(
		subscribeToWindowResize,
		() => window.innerWidth > 1200,
		() => true,
	)

	const isExpanded = manualExpanded !== null ? manualExpanded : isWideViewport
	// Use SSR-matching value (true) until after mount to avoid hydration mismatch
	const effectiveExpanded = hasMounted ? isExpanded : true

	// Headings are pure derivation from content — no state or effect needed
	const headings = useMemo<Heading[]>(() => {
		if (!content) return []

		const extractTextFromChildren = (children: any[]): string =>
			children
				.map((child) => {
					if (typeof child.text === 'string') return child.text
					return ''
				})
				.join('')

		return content
			.filter((block: any) => block.style && block.style.startsWith('h'))
			.map((block: any) => {
				const text = extractTextFromChildren(block.children)
				return {
					id: slugify([text]),
					text,
					level: parseInt(block.style.substring(1)),
				}
			})
	}, [content])

	// Handle scroll spy
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id)
					}
				})
			},
			{
				rootMargin: '-20% 0px -80% 0px',
				threshold: [0, 1],
			}
		)

		headings.forEach((heading) => {
			const element = document.getElementById(heading.id)
			if (element) observer.observe(element)
		})

		return () => observer.disconnect()
	}, [headings])

	if (headings.length === 0) return null

	const classes = classnames(s.root, className, {
		[s.collapsed]: !effectiveExpanded,
		[s.expanded]: effectiveExpanded,
	})

	return (
		<nav className={classes} aria-label="Table of contents">
			<button
				className={s.titleButton}
				onClick={() => setManualExpanded(!effectiveExpanded)}
				aria-expanded={effectiveExpanded}
			>
				<Text
					tag="h2"
					type="productive-headline"
					size="h6"
					color="primary"
					collapse
				>
					{title}
				</Text>
				<span className={s.expandIcon}>{effectiveExpanded ? '−' : '+'}</span>
			</button>
			<div className={s.content}>
				<ul className={s.list}>
					{headings.map((heading) => (
						<li
							key={heading.id}
							className={classnames(s.item, {
								[s.active]: activeId === heading.id,
								[s[`level-${heading.level}`]]: true,
							})}
						>
							<Link
								href={`#${heading.id}`}
								type="primary"
								className={s.link}
								onClick={(e) => {
									e.preventDefault()
									setActiveId(heading.id)
									document.getElementById(heading.id)?.scrollIntoView({
										behavior: 'smooth',
									})
									// Close the bottom sheet after clicking a link on mobile
									if (window.innerWidth <= 1200) {
										setManualExpanded(false)
									}
								}}
							>
								<Text
									tag="span"
									type="productive-body"
									size="body-base"
									color={activeId === heading.id ? 'interactive' : 'primary'}
									collapse
								>
									{heading.text}
								</Text>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</nav>
	)
}

export { TableOfContents }
