import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Link } from '../index'
import { Flex } from '../../flex'

const meta: Meta<typeof Link> = {
	title: 'Cadence / Components / Link',
	component: Link,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component: `
A polymorphic link component with color variants and underline control. Styled with Cadence Design System tokens.

## Polymorphic Usage

Use the \`as\` prop to render as a different element or component (e.g., Next.js Link for client-side routing):

\`\`\`tsx
import NextLink from 'next/link'
<Link as={NextLink} href="/about">About</Link>
\`\`\`

## Variants

- **primary** (default): Interactive color with hover/active states
- **secondary**: Subdued color for secondary navigation
- **brand**: Brand color for emphasis
- **inherit**: Inherits color from parent element
				`,
			},
		},
	},
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Link>

export const Default: Story = {
	render: () => <Link href="#">Default Link</Link>,
}

export const ColorVariants: Story = {
	render: () => (
		<Flex direction="column" gap="base">
			<Link href="#" type="primary">
				Primary Link
			</Link>
			<Link href="#" type="secondary">
				Secondary Link
			</Link>
			<Link href="#" type="brand">
				Brand Link
			</Link>
			<Link href="#" type="inherit">
				Inherit Link
			</Link>
		</Flex>
	),
	parameters: {
		docs: {
			description: {
				story: 'Use the `type` prop to change the color variant of the link.',
			},
		},
	},
}

export const WithoutUnderline: Story = {
	render: () => (
		<Link href="#" isUnderline={false}>
			No Underline
		</Link>
	),
	parameters: {
		docs: {
			description: {
				story: 'Set `isUnderline={false}` to remove the underline decoration.',
			},
		},
	},
}

export const ExternalLink: Story = {
	render: () => (
		<Link href="https://example.com" target="_blank" rel="noopener noreferrer">
			External Link
		</Link>
	),
}
