import type { ReactNode, HTMLAttributes, AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
	/** Text for the nav's `aria-label`. Defaults to "Sidebar navigation". */
	ariaLabel?: string
	/** Uncontrolled initial collapsed state. */
	defaultCollapsed?: boolean
	/** Controlled collapsed state. When provided, `onCollapsedChange` should also be supplied. */
	collapsed?: boolean
	/** Callback fired when the collapsed state changes (controlled or uncontrolled). */
	onCollapsedChange?: (collapsed: boolean) => void
	children?: ReactNode
}

export interface SidebarHeaderProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode
}

export interface SidebarFooterProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode
}

export interface SidebarToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-label'> {
	/** Accessible label. Defaults to a state-aware label ("Collapse sidebar" / "Expand sidebar"). */
	'aria-label'?: string
}

export interface SidebarSectionProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
	/** Optional heading displayed above the section. Hidden when the whole sidebar is collapsed. */
	title?: ReactNode
	/** When true the section is collapsible; the title becomes a trigger with a chevron. */
	collapsible?: boolean
	/** Uncontrolled initial open state (only used when `collapsible`). */
	defaultOpen?: boolean
	/** Controlled open state (only used when `collapsible`). */
	open?: boolean
	/** Callback for controlled open state. */
	onOpenChange?: (open: boolean) => void
	children?: ReactNode
}

export interface SidebarLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	/** Whether this link represents the current page. Adds `aria-current="page"` and active styling. */
	isActive?: boolean
	/** Icon rendered before the label. In collapsed mode this is the only visible element. */
	leadingIcon?: ReactNode
	/** Icon rendered after the label (commonly an external-link glyph). Hidden when collapsed. */
	trailingIcon?: ReactNode
	/** Slot for a `<Badge>` or similar count/status indicator. Hidden when collapsed. */
	badge?: ReactNode
	/** Radix Slot passthrough — renders the child element (e.g., Next.js `<Link>`) instead of `<a>`. */
	asChild?: boolean
	children?: ReactNode
}

export interface SidebarSeparatorProps extends HTMLAttributes<HTMLDivElement> {}
