interface BlockquoteProps {
	/** The quote text to display */
	quote?: string
	/** The attribution (author) of the quote */
	attribution?: string
	/** Optional URL for the attribution link */
	link?: string
	/** Remove default margin spacing
	 * @default false
	 */
	collapse?: boolean
	/** Additional CSS class names */
	className?: string
}

export type { BlockquoteProps }
