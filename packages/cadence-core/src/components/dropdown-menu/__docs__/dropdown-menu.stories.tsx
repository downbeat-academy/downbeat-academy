import React from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../../button'
import { Flex } from '../../flex'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
} from '../index'

const meta: Meta<typeof DropdownMenu> = {
	title: 'Cadence / Components / DropdownMenu',
	component: DropdownMenu,
	parameters: {
		layout: 'centered',
		docs: {
			description: {
				component: `
DropdownMenu displays a menu of actions or options triggered by a button click. It's built on the platform and provides several sub-components for composing rich menu layouts.

## Components

- **DropdownMenu**: Root component that manages open/close state
- **DropdownMenuTrigger**: Element that opens the menu (supports \`asChild\`)
- **DropdownMenuContent**: Container for menu items with positioning and animations
- **DropdownMenuItem**: Standard clickable menu item
- **DropdownMenuLabel**: Non-interactive label for grouping items
- **DropdownMenuSeparator**: Visual divider between groups
- **DropdownMenuShortcut**: Keyboard shortcut hint displayed alongside an item

## Accessibility

- Full keyboard navigation (Arrow keys, Enter, Escape)
- Automatic ARIA attributes for screen readers
- Focus management on open/close
- Support for disabled items
				`,
			},
		},
	},
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<Flex
				padding="large"
				alignItems="center"
				justifyContent="center"
				style={{ minHeight: '300px' }}
			>
				<Story />
			</Flex>
		),
	],
}

export default meta
type Story = StoryObj<typeof DropdownMenu>

export const Default: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="secondary">Open Menu</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Profile</DropdownMenuItem>
				<DropdownMenuItem>Settings</DropdownMenuItem>
				<DropdownMenuItem>Billing</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Log out</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
}

export const WithShortcuts: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="secondary">Edit</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>
					Undo <DropdownMenuShortcut>&#8984;Z</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem>
					Redo <DropdownMenuShortcut>&#8679;&#8984;Z</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					Cut <DropdownMenuShortcut>&#8984;X</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem>
					Copy <DropdownMenuShortcut>&#8984;C</DropdownMenuShortcut>
				</DropdownMenuItem>
				<DropdownMenuItem>
					Paste <DropdownMenuShortcut>&#8984;V</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Use `DropdownMenuShortcut` to display keyboard shortcuts alongside menu items.',
			},
		},
	},
}

export const WithDisabledItems: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="secondary">Actions</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem>Edit</DropdownMenuItem>
				<DropdownMenuItem>Duplicate</DropdownMenuItem>
				<DropdownMenuItem disabled>Archive</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem disabled>Delete</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Menu items can be disabled with the `disabled` prop. Disabled items are visually dimmed and cannot be interacted with.',
			},
		},
	},
}

export const WithInsetItems: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="secondary">Menu</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel inset>Edit</DropdownMenuLabel>
				<DropdownMenuItem inset>Undo</DropdownMenuItem>
				<DropdownMenuItem inset>Redo</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuLabel inset>View</DropdownMenuLabel>
				<DropdownMenuItem inset>Zoom In</DropdownMenuItem>
				<DropdownMenuItem inset>Zoom Out</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
	parameters: {
		docs: {
			description: {
				story:
					'Use the `inset` prop on `DropdownMenuItem` and `DropdownMenuLabel` to add extra left padding, useful for aligning items when some have icons or indicators.',
			},
		},
	},
}

export const Positioning: Story = {
	render: () => (
		<Flex direction="row" gap="large" wrap>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="secondary">Top</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent side="top">
					<DropdownMenuItem>Item 1</DropdownMenuItem>
					<DropdownMenuItem>Item 2</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="secondary">Right</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent side="right">
					<DropdownMenuItem>Item 1</DropdownMenuItem>
					<DropdownMenuItem>Item 2</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="secondary">Left</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent side="left">
					<DropdownMenuItem>Item 1</DropdownMenuItem>
					<DropdownMenuItem>Item 2</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</Flex>
	),
	parameters: {
		docs: {
			description: {
				story:
					'`DropdownMenuContent` supports `side` (top, right, bottom, left) and `align` (start, center, end) props for controlling position. The menu automatically adjusts to stay within the viewport.',
			},
		},
	},
}
