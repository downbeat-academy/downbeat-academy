'use client'

import { useEffect, useState } from 'react'
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

const TableOfContents = ({
	content,
	title,
	className,
}: TableOfContentsProps) => {
	const [headings, setHeadings] = useState<Heading[]>([])
	const [activeId, setActiveId] = useState<string>('')

	// Extract headings from Portable Text content
	useEffect(() => {
		const extractTextFromChildren = (children: any[]): string => {
			return children
				.map((child) => {
					if (typeof child.text === 'string') return child.text
					if (child.marks && child.marks.length > 0) {
						// Handle formatted text (e.g., emphasis)
						return child.text
					}
					return ''
				})
				.join('')
		}

		const extractHeadings = (blocks: any[]): Heading[] => {
			return blocks
				.filter((block) => block.style && block.style.startsWith('h'))
				.map((block) => {
					const text = extractTextFromChildren(block.children)
					const id = slugify([text])
					return {
						id,
						text,
						level: parseInt(block.style.substring(1)),
					}
				})
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
			{title ? (
				<Text
					tag="h2"
					type="productive-headline"
					size="h6"
					color="primary"
					collapse
				>
					{title}
				</Text>
			) : null}
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
								collapse
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
