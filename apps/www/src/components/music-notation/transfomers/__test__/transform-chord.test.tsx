import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { transformChord } from '../transform-chord'

const renderChord = (...args: Parameters<typeof transformChord>) =>
	render(<>{transformChord(...args)}</>).container.textContent

describe('transformChord', () => {
	it('renders root, quality, extension, and alternate bass', () => {
		expect(renderChord('C', 'major7', 'flat9', 'E', 'symbol')).toBe(
			'Cmaj7(𝄭9)/E'
		)
	})

	it('renders the root on its own when other parts are empty', () => {
		expect(renderChord('G', '', '', '', 'symbol')).toBe('G')
	})

	it('renders the alternate bass as a slash chord', () => {
		expect(renderChord('A', 'minor', '', 'C', 'abbr')).toBe('Amin/C')
	})

	it('treats abbr and symbol quality maps identically (current behavior)', () => {
		expect(renderChord('D', 'minor7', '', '', 'abbr')).toBe('Dmin7')
		expect(renderChord('D', 'minor7', '', '', 'symbol')).toBe('Dmin7')
	})

	it('omits the quality segment for an unsupported quality', () => {
		// Documents the `getQuality` default fallthrough (returns undefined), so the
		// quality renders as nothing rather than an error string.
		expect(renderChord('C', 'unsupportedQuality', '', '', 'abbr')).toBe('C')
	})
})
