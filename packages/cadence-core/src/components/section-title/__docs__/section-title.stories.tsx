import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { SectionTitle } from '../index'
import { Text } from '../../text'

const meta: Meta<typeof SectionTitle> = {
	title: 'Cadence / Components / SectionTitle',
	component: SectionTitle,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component: `
A section title component with alignment, background, and border variants. Designed to pair with SectionContainer for consistent page section headers.

## Features

- Title and subtitle slots (accepts ReactNode)
- Children slot for custom content
- Alignment options (left, center, right)
- Background color variants
- Optional bottom border
				`,
			},
		},
	},
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SectionTitle>

export const Default: Story = {
	render: () => (
		<SectionTitle
			title={
				<Text type="productive-headline" size="headline-large" tag="h2" collapse>
					Section Title
				</Text>
			}
			subtitle={
				<Text type="expressive-body" size="body-base" collapse>
					A descriptive subtitle for this section
				</Text>
			}
		/>
	),
}

export const CenterAligned: Story = {
	render: () => (
		<SectionTitle
			alignment="center"
			title={
				<Text type="productive-headline" size="headline-large" tag="h2" collapse>
					Centered Title
				</Text>
			}
		/>
	),
}

export const WithoutBorder: Story = {
	render: () => (
		<SectionTitle
			hasBorder={false}
			title={
				<Text type="productive-headline" size="headline-large" tag="h2" collapse>
					No Border
				</Text>
			}
		/>
	),
}

export const WithBackground: Story = {
	render: () => (
		<SectionTitle
			background="faint"
			title={
				<Text type="productive-headline" size="headline-large" tag="h2" collapse>
					Faint Background
				</Text>
			}
		/>
	),
}

export const WithChildren: Story = {
	render: () => (
		<SectionTitle background="primary">
			<Text type="productive-headline" size="headline-large" tag="h2" collapse>
				Custom Children
			</Text>
			<Text type="expressive-body" size="body-base" collapse>
				Content passed as children instead of title/subtitle props
			</Text>
		</SectionTitle>
	),
}
