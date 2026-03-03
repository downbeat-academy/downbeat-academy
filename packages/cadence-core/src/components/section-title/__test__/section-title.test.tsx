import React from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SectionTitle } from '../section-title'

describe('SectionTitle component', () => {
	it('renders title content', () => {
		render(<SectionTitle title={<h2>Test Title</h2>} />)
		expect(
			screen.getByRole('heading', { name: 'Test Title' })
		).toBeInstanceOf(HTMLHeadingElement)
	})

	it('renders subtitle content', () => {
		render(<SectionTitle subtitle={<p>Subtitle text</p>} />)
		expect(screen.getByText('Subtitle text')).toBeInstanceOf(HTMLElement)
	})

	it('renders children', () => {
		render(<SectionTitle>Child content</SectionTitle>)
		expect(screen.getByText('Child content')).toBeInstanceOf(HTMLElement)
	})

	it('applies custom className', () => {
		render(<SectionTitle className="custom-class">Content</SectionTitle>)
		expect(screen.getByText('Content').className).toContain('custom-class')
	})
})
