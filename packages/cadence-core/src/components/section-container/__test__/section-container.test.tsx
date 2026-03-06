import React from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SectionContainer } from '../section-container'

describe('SectionContainer component', () => {
	it('renders children correctly', () => {
		render(<SectionContainer>Content</SectionContainer>)
		expect(screen.getByText('Content')).toBeInstanceOf(HTMLElement)
	})

	it('renders as a div by default', () => {
		render(<SectionContainer>Content</SectionContainer>)
		expect(screen.getByText('Content').tagName).toBe('DIV')
	})

	it('renders as the specified tag', () => {
		render(<SectionContainer tag="section">Content</SectionContainer>)
		expect(screen.getByText('Content').tagName).toBe('SECTION')
	})

	it('applies custom className', () => {
		render(
			<SectionContainer className="custom-class">Content</SectionContainer>
		)
		expect(screen.getByText('Content').className).toContain('custom-class')
	})
})
