'use client'

import type { MutableRefObject, Ref } from 'react'

/**
 * Assigns one node to several refs.
 *
 * Returns nothing rather than the results of the assignments: React 19 treats a return
 * value from a ref callback as a cleanup function, so returning the array would have it
 * called as one on unmount.
 *
 * Internal — deliberately absent from the package barrel, like `src/test-utils`.
 */
function composeRefs<T>(...refs: Array<Ref<T> | undefined>) {
	return (node: T | null) => {
		refs.forEach((ref) => {
			if (typeof ref === 'function') {
				ref(node)
			} else if (ref !== null && ref !== undefined) {
				;(ref as MutableRefObject<T | null>).current = node
			}
		})
	}
}

export { composeRefs }
