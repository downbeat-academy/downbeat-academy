interface SkeletonLoaderProps {
	/** Number of skeleton lines to render.
	 * @default 1
	 */
	count?: number
	/** Render as a circle */
	circle?: boolean
	/** Additional CSS class names */
	className?: string
	/** Width of the skeleton.
	 * @default '100%'
	 */
	width?: number | string
	/** Height of the skeleton */
	height?: number | string
	/** Border radius.
	 * @default 'var(--cds-radii-medium)'
	 */
	borderRadius?: number | string
	/** Display inline */
	inline?: boolean
	/** Animation duration in seconds */
	duration?: number
	/** Animation direction.
	 * @default 'ltr'
	 */
	direction?: 'ltr' | 'rtl'
	/** Enable shimmer animation.
	 * @default true
	 */
	enableAnimation?: boolean
}

export type { SkeletonLoaderProps }
