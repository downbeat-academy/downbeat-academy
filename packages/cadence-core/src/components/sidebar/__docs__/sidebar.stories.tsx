import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
	Sidebar,
	SidebarHeader,
	SidebarFooter,
	SidebarToggle,
	SidebarSection,
	SidebarLink,
	SidebarSeparator,
} from '../index'
import { Badge } from '../../badge'
import { Button } from '../../button'
import { TooltipProvider } from '../../tooltip'
import {
	Logs,
	Music,
	OpenNewWindow,
	QuestionCircleOutline,
	InfoCircleOutline,
	AlertCircleOutline,
} from 'cadence-icons'

const meta: Meta<typeof Sidebar> = {
	title: 'Cadence / Components / Sidebar',
	component: Sidebar,
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
Sidebar is a composable navigation rail for admin dashboards, app frames, and other multi-section surfaces. Compose it with \`SidebarHeader\`, \`SidebarSection\`, \`SidebarLink\`, \`SidebarSeparator\`, \`SidebarFooter\`, and a \`SidebarToggle\`.

- **Collapsed mode**: shrinks to an icon rail; hovering a link reveals the label via Tooltip.
- **Collapsible sections**: opt in with \`collapsible\` on \`SidebarSection\`.
- **Polymorphic links**: pass \`asChild\` to \`SidebarLink\` to slot in Next.js \`<Link>\`, React Router, or any custom element.
- **Badges**: drop the existing \`<Badge>\` component into the \`badge\` slot.

Renders a native \`<nav>\` with \`aria-label\` and \`aria-current="page"\` on the active link. Section triggers get \`aria-expanded\` / \`aria-controls\` from Radix Collapsible.
        `,
			},
		},
	},
	tags: ['autodocs'],
	decorators: [
		(Story) => (
			<TooltipProvider>
				<div style={{ display: 'flex', minHeight: '480px', background: '#f7f7fb' }}>
					<Story />
					<div style={{ flex: 1, padding: '24px' }}>
						<p style={{ color: '#666' }}>Main content area</p>
					</div>
				</div>
			</TooltipProvider>
		),
	],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: () => (
		<Sidebar ariaLabel="Example navigation">
			<SidebarSection title="Content">
				<SidebarLink href="#articles" leadingIcon={<Logs />}>
					Articles
				</SidebarLink>
				<SidebarLink href="#handbook" leadingIcon={<Music />}>
					Handbook
				</SidebarLink>
				<SidebarLink href="#lexicon" leadingIcon={<InfoCircleOutline />}>
					Lexicon
				</SidebarLink>
			</SidebarSection>
		</Sidebar>
	),
}

export const WithHeaderFooter: Story = {
	render: () => (
		<Sidebar ariaLabel="With header and footer">
			<SidebarHeader>
				<strong style={{ fontFamily: 'var(--cds-typography-font-family-productive-headline)' }}>
					Downbeat
				</strong>
				<SidebarToggle style={{ marginLeft: 'auto' }} />
			</SidebarHeader>
			<SidebarSection title="Content">
				<SidebarLink href="#articles" leadingIcon={<Logs />} isActive>
					Articles
				</SidebarLink>
				<SidebarLink href="#handbook" leadingIcon={<Music />}>
					Handbook
				</SidebarLink>
			</SidebarSection>
			<SidebarFooter>
				<span style={{ fontSize: 12, color: 'var(--cds-color-foreground-faint)' }}>v3.2.1</span>
			</SidebarFooter>
		</Sidebar>
	),
}

export const WithCollapsibleSections: Story = {
	render: () => (
		<Sidebar ariaLabel="Collapsible sections">
			<SidebarSection title="Content" collapsible defaultOpen>
				<SidebarLink href="#articles" leadingIcon={<Logs />}>
					Articles
				</SidebarLink>
				<SidebarLink href="#handbook" leadingIcon={<Music />}>
					Handbook
				</SidebarLink>
			</SidebarSection>
			<SidebarSeparator />
			<SidebarSection title="System" collapsible defaultOpen={false}>
				<SidebarLink href="#alerts" leadingIcon={<AlertCircleOutline />}>
					Alerts
				</SidebarLink>
				<SidebarLink href="#help" leadingIcon={<QuestionCircleOutline />}>
					Help
				</SidebarLink>
			</SidebarSection>
		</Sidebar>
	),
}

export const WithActiveLink: Story = {
	render: () => (
		<Sidebar ariaLabel="Active state">
			<SidebarSection title="Content">
				<SidebarLink href="#articles" leadingIcon={<Logs />}>
					Articles
				</SidebarLink>
				<SidebarLink href="#handbook" leadingIcon={<Music />} isActive>
					Handbook (active)
				</SidebarLink>
				<SidebarLink href="#lexicon" leadingIcon={<InfoCircleOutline />}>
					Lexicon
				</SidebarLink>
			</SidebarSection>
		</Sidebar>
	),
}

export const WithExternalLink: Story = {
	render: () => (
		<Sidebar ariaLabel="External link">
			<SidebarSection title="Resources">
				<SidebarLink href="#help" leadingIcon={<QuestionCircleOutline />}>
					Help
				</SidebarLink>
				<SidebarLink
					href="https://example.com/docs"
					leadingIcon={<InfoCircleOutline />}
					trailingIcon={<OpenNewWindow />}
					target="_blank"
					rel="noopener noreferrer"
				>
					Docs
				</SidebarLink>
			</SidebarSection>
		</Sidebar>
	),
}

export const WithBadges: Story = {
	render: () => (
		<Sidebar ariaLabel="With badges">
			<SidebarSection title="Content">
				<SidebarLink
					href="#users"
					leadingIcon={<Logs />}
					badge={<Badge type="info" size="small" style="light" text="12" />}
				>
					Users
				</SidebarLink>
				<SidebarLink
					href="#inbox"
					leadingIcon={<Music />}
					badge={<Badge type="warning" size="small" style="light" text="3 new" />}
				>
					Inbox
				</SidebarLink>
				<SidebarLink href="#help" leadingIcon={<QuestionCircleOutline />}>
					Help
				</SidebarLink>
			</SidebarSection>
		</Sidebar>
	),
}

export const AsChildNextLink: Story = {
	render: () => (
		<Sidebar ariaLabel="asChild demo">
			<SidebarSection title="Docs the polymorphism API">
				<SidebarLink asChild leadingIcon={<Logs />} isActive>
					{/* In a real app this would be a Next.js <Link> or React Router <Link> */}
					<a href="#articles" data-mock-router-link="true">
						Articles
					</a>
				</SidebarLink>
				<SidebarLink asChild leadingIcon={<Music />}>
					<a href="#handbook" data-mock-router-link="true">
						Handbook
					</a>
				</SidebarLink>
			</SidebarSection>
		</Sidebar>
	),
	parameters: {
		docs: {
			description: {
				story:
					'`SidebarLink asChild` uses Radix Slot to render the child element (typically Next.js `<Link>`) while merging props (className, aria-current, isActive styling) onto it.',
			},
		},
	},
}

export const Collapsed: Story = {
	render: () => (
		<Sidebar ariaLabel="Collapsed rail" defaultCollapsed>
			<SidebarHeader>
				<SidebarToggle />
			</SidebarHeader>
			<SidebarSection title="Content">
				<SidebarLink href="#articles" leadingIcon={<Logs />}>
					Articles
				</SidebarLink>
				<SidebarLink href="#handbook" leadingIcon={<Music />} isActive>
					Handbook
				</SidebarLink>
				<SidebarLink href="#help" leadingIcon={<QuestionCircleOutline />}>
					Help
				</SidebarLink>
			</SidebarSection>
		</Sidebar>
	),
	parameters: {
		docs: {
			description: {
				story:
					'When collapsed, labels/badges/trailing icons hide and hovering a link surfaces the label via a right-side Tooltip.',
			},
		},
	},
}

export const ToggleControlled: Story = {
	render: () => {
		const ControlledExample = () => {
			const [collapsed, setCollapsed] = useState(false)
			return (
				<>
					<Sidebar
						ariaLabel="Controlled"
						collapsed={collapsed}
						onCollapsedChange={setCollapsed}
					>
						<SidebarHeader>
							<SidebarToggle />
						</SidebarHeader>
						<SidebarSection title="Content">
							<SidebarLink href="#a" leadingIcon={<Logs />}>
								Articles
							</SidebarLink>
							<SidebarLink href="#b" leadingIcon={<Music />}>
								Handbook
							</SidebarLink>
						</SidebarSection>
					</Sidebar>
					<div style={{ padding: 24 }}>
						<Button onClick={() => setCollapsed((c) => !c)}>
							Toggle from outside ({collapsed ? 'expand' : 'collapse'})
						</Button>
					</div>
				</>
			)
		}
		return <ControlledExample />
	},
	parameters: {
		docs: {
			description: {
				story:
					'Fully controlled mode via `collapsed` + `onCollapsedChange`. Any external control (button, keyboard shortcut, persisted preference) can drive the state.',
			},
		},
	},
}
