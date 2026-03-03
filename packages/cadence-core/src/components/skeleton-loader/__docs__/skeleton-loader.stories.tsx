import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { SkeletonLoader } from '../index'

const meta: Meta<typeof SkeletonLoader> = {
	title: 'Cadence / Components / SkeletonLoader',
	component: SkeletonLoader,
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component: `
A loading placeholder component that uses Cadence Design System tokens for theming. Wraps react-loading-skeleton with consistent colors and border radius.

## Features

- Shimmer animation with configurable duration and direction
- Circle mode for avatar placeholders
- Customizable dimensions and border radius
- Multiple skeleton lines with the \`count\` prop
				`,
			},
		},
	},
	tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SkeletonLoader>

export const Default: Story = {
	render: () => <SkeletonLoader count={3} height={20} />,
}

export const Circle: Story = {
	render: () => <SkeletonLoader count={1} circle width={48} height={48} />,
	parameters: {
		docs: {
			description: {
				story: 'Use `circle` for avatar or icon placeholders.',
			},
		},
	},
}

export const CustomDimensions: Story = {
	render: () => <SkeletonLoader count={1} width={200} height={120} />,
}

export const WithoutAnimation: Story = {
	render: () => (
		<SkeletonLoader count={2} height={20} enableAnimation={false} />
	),
}
