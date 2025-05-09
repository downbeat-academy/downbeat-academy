'use client'

import { useEffect, useState } from 'react'
import classnames from 'classnames'
import { Text } from 'cadence-core'
import { Link } from '@components/link'
import s from './table-of-contents.module.css'

interface Heading {
	id: string
	text: string
	level: number
}

interface TableOfContentsProps {
	content: any // Portable Text content
	className?: string
}

const TableOfContents = ({ content, className }: TableOfContentsProps) => {
	const [headings, setHeadings] = useState<Heading[]>([])
	const [activeId, setActiveId] = useState<string>('')

	// Extract headings from Portable Text content
	useEffect(() => {
		const extractHeadings = (blocks: any[]): Heading[] => {
			return blocks
				.filter((block) => block.style && block.style.startsWith('h'))
				.map((block) => ({
					id: block._key,
					text: block.children[0].text,
					level: parseInt(block.style.substring(1)),
				}))
		}

		if (content) {
			setHeadings(extractHeadings(content))
		}
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
			{ rootMargin: '-20% 0px -80% 0px' }
		)

		headings.forEach((heading) => {
			const element = document.getElementById(heading.id)
			if (element) observer.observe(element)
		})

		return () => observer.disconnect()
	}, [headings])

	if (headings.length === 0) return null

	const classes = classnames(s.root, className)

	return (
		<nav className={classes} aria-label="Table of contents">
			<Text
				tag="h2"
				type="productive-headline"
				size="h4"
				color="primary"
				className={s.title}
			>
				On this page
			</Text>
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
								document.getElementById(heading.id)?.scrollIntoView({
									behavior: 'smooth',
								})
							}}
						>
							<Text
								tag="span"
								type="productive-body"
								size="body-base"
								color={activeId === heading.id ? 'interactive' : 'primary'}
							>
								{heading.text}
							</Text>
						</Link>
					</li>
				))}
			</ul>
		</nav>
	)
}

export { TableOfContents }
