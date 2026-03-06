import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Blockquote } from '../index'

const meta: Meta<typeof Blockquote> = {
	title: 'Cadence / Components / Blockquote',
	component: Blockquote,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component: `
A styled blockquote component with optional attribution and link. Uses Cadence Design System tokens for colors and spacing.

## Components

- **quote**: The primary quote text displayed in emphasis
- **attribution**: The author or source, prefixed with a dash
- **link**: Optional URL that makes the attribution clickable

## Accessibility

Uses semantic \`<blockquote>\` HTML element for proper screen reader support.
				`,
			},
		},
	},
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Blockquote>

export const Default: Story = {
	render: () => (
		<Blockquote
			quote="Music is the universal language of mankind."
			attribution="Henry Wadsworth Longfellow"
		/>
	),
}

export const WithLink: Story = {
	render: () => (
		<Blockquote
			quote="If you have to ask what jazz is, you will never know."
			attribution="Louis Armstrong"
			link="https://example.com"
		/>
	),
	parameters: {
		docs: {
			description: {
				story: 'When a `link` prop is provided, the attribution becomes a clickable link.',
			},
		},
	},
}

export const QuoteOnly: Story = {
	render: () => (
		<Blockquote quote="Jazz is not just music, it is a way of life." />
	),
}

export const Collapsed: Story = {
	render: () => (
		<Blockquote
			quote="A collapsed blockquote with no vertical margin."
			attribution="Author Name"
			collapse
		/>
	),
	parameters: {
		docs: {
			description: {
				story: 'Use `collapse` to remove the default vertical margin.',
			},
		},
	},
}
