'use client'

import React, { Children, cloneElement, forwardRef, isValidElement } from 'react'
import type { SlotProps, SlottableProps, AnyProps } from './types'

/**
 * In-house replacement for `@radix-ui/react-slot`.
 *
 * `Slot` renders no element of its own: it takes the single element passed as its child,
 * merges its own props into that element, and returns it. That is what powers `asChild`,
 * where a consumer supplies the real DOM node — a Next.js `<Link>`, say — and the
 * component contributes className, handlers and a ref to it.
 *
 * This exists rather than the dependency because the one consumer,
 * `sidebar/sidebar-link.tsx`, was coupled to Radix's `SlotClone` *internals* rather than
 * its public API: it documented that children had to be spread as siblings instead of
 * wrapped in a Fragment, because of how `cloneElement` was used inside the library. Owning
 * ~90 lines here removes that coupling, and the behaviour is specified by this file's tests
 * rather than by a transitive package.
 */

// React 19 moved `ref` into props; on React 18 it lives on the element. Reading
// `element.ref` under 19 logs a deprecation warning, so branch on the version rather than
// probing. The package's peer range still allows both.
const REACT_MAJOR = Number.parseInt(React.version, 10)

function getElementRef(element: React.ReactElement): React.Ref<unknown> | undefined {
	if (REACT_MAJOR >= 19) {
		return (element.props as { ref?: React.Ref<unknown> }).ref
	}
	return (element as unknown as { ref?: React.Ref<unknown> }).ref
}

function setRef(ref: React.Ref<unknown> | undefined, value: unknown) {
	if (typeof ref === 'function') {
		ref(value)
	} else if (ref !== null && ref !== undefined) {
		;(ref as React.MutableRefObject<unknown>).current = value
	}
}

/**
 * Assigns one node to several refs. Returns `undefined` rather than the results, because
 * React 19 treats a return value from a ref callback as a cleanup function.
 */
function composeRefs(...refs: Array<React.Ref<unknown> | undefined>) {
	return (node: unknown) => {
		refs.forEach((ref) => setRef(ref, node))
	}
}

/**
 * Child props win, except for the three that compose rather than replace:
 * event handlers run child-first then slot, `style` merges with the child's winning, and
 * `className` concatenates. This matches the Radix semantics the sidebar relied on.
 */
function mergeProps(slotProps: AnyProps, childProps: AnyProps): AnyProps {
	const overrideProps: AnyProps = { ...childProps }

	for (const propName in childProps) {
		const slotPropValue = slotProps[propName]
		const childPropValue = childProps[propName]

		if (/^on[A-Z]/.test(propName)) {
			if (typeof slotPropValue === 'function' && typeof childPropValue === 'function') {
				overrideProps[propName] = (...args: unknown[]) => {
					childPropValue(...args)
					slotPropValue(...args)
				}
			} else if (typeof slotPropValue === 'function') {
				overrideProps[propName] = slotPropValue
			}
		} else if (propName === 'style') {
			overrideProps[propName] = {
				...(slotPropValue as React.CSSProperties),
				...(childPropValue as React.CSSProperties),
			}
		} else if (propName === 'className') {
			overrideProps[propName] = [slotPropValue, childPropValue]
				.filter(Boolean)
				.join(' ')
		}
	}

	return { ...slotProps, ...overrideProps }
}

/** Merges props and refs onto exactly one child element. */
const SlotClone = forwardRef<unknown, SlotProps>(({ children, ...slotProps }, forwardedRef) => {
	if (!isValidElement(children)) {
		// More than one child, or none, is a usage error rather than something to guess at.
		return Children.count(children) > 1 ? Children.only(null) : null
	}

	const childRef = getElementRef(children)
	const props = mergeProps(slotProps as AnyProps, children.props as AnyProps)
	props.ref = forwardedRef ? composeRefs(forwardedRef, childRef) : childRef

	return cloneElement(children, props)
})

SlotClone.displayName = 'SlotClone'

/**
 * Marks which child of a `Slot` is the element to promote. Everything else passed to the
 * `Slot` is rendered around that element's own children.
 */
const Slottable = ({ children }: SlottableProps) => <>{children}</>
Slottable.displayName = 'Slottable'

function isSlottable(
	child: React.ReactNode
): child is React.ReactElement<SlottableProps> {
	return isValidElement(child) && child.type === Slottable
}

const Slot = forwardRef<unknown, SlotProps>(({ children, ...slotProps }, forwardedRef) => {
	const childrenArray = Children.toArray(children)
	const slottable = childrenArray.find(isSlottable)

	if (!slottable) {
		return (
			<SlotClone {...slotProps} ref={forwardedRef}>
				{children}
			</SlotClone>
		)
	}

	// The Slottable's own child becomes the rendered element, and the Slot's other children
	// are rendered around that element's original children — so `<Slot><Icon/><Slottable>
	// <a>Label</a></Slottable><Badge/></Slot>` yields `<a><Icon/>Label<Badge/></a>`.
	const promoted = slottable.props.children

	const newChildren = childrenArray.map((child) => {
		if (child !== slottable) return child
		if (Children.count(promoted) > 1) return Children.only(null)
		return isValidElement(promoted)
			? (promoted.props as { children?: React.ReactNode }).children
			: null
	})

	return (
		<SlotClone {...slotProps} ref={forwardedRef}>
			{isValidElement(promoted)
				? cloneElement(promoted, undefined, newChildren)
				: null}
		</SlotClone>
	)
})

Slot.displayName = 'Slot'

export { Slot, Slottable }
