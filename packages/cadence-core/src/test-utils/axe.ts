import axe from 'axe-core'

/**
 * Runs axe against a rendered container and returns its violations.
 *
 * `color-contrast` is disabled and cannot be enabled here. jsdom has no layout engine, so
 * axe cannot resolve computed colors and the rule either throws or reports nothing
 * useful — an "empty violations" result would be a false pass, not a real one. Contrast is
 * checked in a real browser via the Storybook a11y addon panel.
 *
 * Usage:
 *
 * ```ts
 * const { container } = render(<Thing />)
 * expect(await axeViolations(container)).toEqual([])
 * ```
 *
 * Assert on the violations array rather than a boolean — a failure then prints which rule
 * broke and on which node, instead of `expected false to be true`.
 */
export async function axeViolations(
	container: HTMLElement,
	/** Extra per-test rule overrides, merged over the defaults. */
	rules: axe.RuleObject = {}
): Promise<axe.Result[]> {
	const results = await axe.run(container, {
		rules: { 'color-contrast': { enabled: false }, ...rules },
	})
	return results.violations
}

/**
 * Formats violations for an assertion message. Use when the bare array is too noisy to
 * read in CI output.
 */
export function formatViolations(violations: axe.Result[]): string {
	return violations
		.map((v) => `${v.id}: ${v.help}\n  ${v.nodes.map((n) => n.html).join('\n  ')}`)
		.join('\n')
}
