import React from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Blockquote } from '../blockquote'

describe('Blockquote component', () => {
	it('renders without crashing', () => {
		render(<Blockquote />)
	})

	it('displays the quote text', () => {
		render(<Blockquote quote="Quote text" />)
		expect(screen.getByText('Quote text')).toBeInstanceOf(HTMLElement)
	})

	it('displays the attribution with dash prefix', () => {
		render(<Blockquote attribution="Quote author" />)
		expect(screen.getByText('– Quote author')).toBeInstanceOf(HTMLElement)
	})

	it('renders attribution with a link when link prop is provided', () => {
		render(
			<Blockquote
				attribution="Quote author"
				link="https://downbeatacademy.com"
			/>
		)
		const link = screen.getByRole('link', { name: /Quote author/ })
		expect(link.getAttribute('href')).toBe('https://downbeatacademy.com')
	})

	it('does not render quote when quote prop is not provided', () => {
		const { container } = render(<Blockquote attribution="Author" />)
		expect(container.querySelector('blockquote')).toBeNull()
	})
})
