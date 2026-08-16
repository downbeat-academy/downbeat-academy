import { describe, it, expect } from 'vitest'
import { reducer } from '../use-toast'

/**
 * Pure unit tests for the `use-toast` reducer.
 *
 * This file deliberately never touches the module's singleton. `use-toast.ts` keeps
 * `memoryState` at module scope, so anything that goes through `toast()` persists across
 * tests within a file — measured, not assumed. The reducer is exported and pure, so the
 * state machine can be pinned here without fighting that, and the DOM-level behaviour is
 * covered separately in `toast.test.tsx`.
 *
 * The two constants below are duplicated from `use-toast.ts`, which does not export them.
 * If C.1 changes either, these tests should be updated deliberately rather than relaxed.
 */
const TOAST_LIMIT = 5

const mk = (id: string, extra: Record<string, unknown> = {}) => ({
	id,
	title: `Toast ${id}`,
	open: true,
	...extra,
})

describe('use-toast reducer', () => {
	describe('ADD_TOAST', () => {
		it('prepends, so the newest toast is first', () => {
			const state = reducer(
				{ toasts: [mk('1')] as never },
				{ type: 'ADD_TOAST', toast: mk('2') as never }
			)

			expect(state.toasts.map((t) => t.id)).toEqual(['2', '1'])
		})

		it(`caps the queue at ${TOAST_LIMIT} and drops the oldest`, () => {
			let state = { toasts: [] as never[] }
			for (let i = 1; i <= TOAST_LIMIT + 2; i++) {
				state = reducer(state, {
					type: 'ADD_TOAST',
					toast: mk(String(i)) as never,
				}) as typeof state
			}

			expect(state.toasts).toHaveLength(TOAST_LIMIT)
			// Newest first, so the survivors are the last TOAST_LIMIT added.
			expect(state.toasts.map((t) => t.id)).toEqual(['7', '6', '5', '4', '3'])
		})
	})

	describe('UPDATE_TOAST', () => {
		it('merges into the matching toast only', () => {
			const state = reducer(
				{ toasts: [mk('1'), mk('2')] as never },
				{ type: 'UPDATE_TOAST', toast: { id: '2', title: 'Changed' } as never }
			)

			expect(state.toasts.find((t) => t.id === '2')?.title).toBe('Changed')
			expect(state.toasts.find((t) => t.id === '1')?.title).toBe('Toast 1')
		})

		it('keeps fields the update does not mention', () => {
			const state = reducer(
				{ toasts: [mk('1', { description: 'kept' })] as never },
				{ type: 'UPDATE_TOAST', toast: { id: '1', title: 'New' } as never }
			)

			expect(state.toasts[0]).toMatchObject({
				title: 'New',
				description: 'kept',
				open: true,
			})
		})

		it('is a no-op when no toast matches', () => {
			const before = [mk('1')] as never
			const state = reducer(
				{ toasts: before },
				{ type: 'UPDATE_TOAST', toast: { id: 'nope', title: 'x' } as never }
			)

			expect(state.toasts).toEqual(before)
		})
	})

	describe('DISMISS_TOAST', () => {
		it('closes the targeted toast without removing it', () => {
			const state = reducer(
				{ toasts: [mk('1'), mk('2')] as never },
				{ type: 'DISMISS_TOAST', toastId: '1' }
			)

			// Dismissal is a two-step: `open` goes false so the exit animation can run,
			// and REMOVE_TOAST takes it out of the array later.
			expect(state.toasts).toHaveLength(2)
			expect(state.toasts.find((t) => t.id === '1')?.open).toBe(false)
			expect(state.toasts.find((t) => t.id === '2')?.open).toBe(true)
		})

		it('closes every toast when given no id', () => {
			const state = reducer(
				{ toasts: [mk('1'), mk('2')] as never },
				{ type: 'DISMISS_TOAST', toastId: undefined }
			)

			expect(state.toasts.every((t) => t.open === false)).toBe(true)
		})
	})

	describe('REMOVE_TOAST', () => {
		it('removes only the targeted toast', () => {
			const state = reducer(
				{ toasts: [mk('1'), mk('2')] as never },
				{ type: 'REMOVE_TOAST', toastId: '1' }
			)

			expect(state.toasts.map((t) => t.id)).toEqual(['2'])
		})

		it('clears everything when given no id', () => {
			const state = reducer(
				{ toasts: [mk('1'), mk('2')] as never },
				{ type: 'REMOVE_TOAST', toastId: undefined }
			)

			expect(state.toasts).toEqual([])
		})

		it('is a no-op when no toast matches', () => {
			const state = reducer(
				{ toasts: [mk('1')] as never },
				{ type: 'REMOVE_TOAST', toastId: 'nope' }
			)

			expect(state.toasts.map((t) => t.id)).toEqual(['1'])
		})
	})

	it('does not mutate the state it is given', () => {
		const toasts = [mk('1')] as never
		const original = { toasts }

		reducer(original, { type: 'DISMISS_TOAST', toastId: '1' })

		expect(original.toasts).toBe(toasts)
		expect((original.toasts as unknown as { open: boolean }[])[0].open).toBe(
			true
		)
	})
})
