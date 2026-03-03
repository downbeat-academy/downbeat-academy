import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { SectionContainer } from '../index'
import { Text } from '../../text'

const meta: Meta<typeof SectionContainer> = {
	title: 'Cadence / Components / SectionContainer',
	component: SectionContainer,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component: `
A container component with background and border color variants. Provides consistent section styling using Cadence Design System tokens.

## Features

- Polymorphic \`tag\` prop to render as any HTML element
- Background color variants matching the design token system
- Border color variants with child separator styling
				`,
			},
		},
	},
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SectionContainer>

export const Default: Story = {
	render: () => (
		<SectionContainer background="primary">
			<div style={{ padding: '2rem' }}>
				<Text type="productive-body" size="body-base">
					Default section container with primary background
				</Text>
			</div>
		</SectionContainer>
	),
}

export const BackgroundVariants: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
			{(
				[
					'primary',
					'faint',
					'high-contrast',
					'brand',
					'interactive',
				] as const
			).map((bg) => (
				<SectionContainer key={bg} background={bg}>
					<div style={{ padding: '1rem' }}>
						<Text
							type="productive-body"
							size="body-base"
							color={bg === 'high-contrast' ? 'high-contrast' : 'primary'}
						>
							{bg} background
						</Text>
					</div>
				</SectionContainer>
			))}
		</div>
	),
}

export const BorderColorVariants: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
			{(
				['primary', 'brand', 'interactive', 'success', 'critical'] as const
			).map((color) => (
				<SectionContainer
					key={color}
					background="primary"
					borderColor={color}
				>
					<div style={{ padding: '1rem' }}>
						<Text type="productive-body" size="body-base">
							{color} border
						</Text>
					</div>
				</SectionContainer>
			))}
		</div>
	),
}

export const AsSection: Story = {
	render: () => (
		<SectionContainer tag="section" background="faint">
			<div style={{ padding: '2rem' }}>
				<Text type="productive-body" size="body-base">
					Rendered as a &lt;section&gt; element
				</Text>
			</div>
		</SectionContainer>
	),
}
