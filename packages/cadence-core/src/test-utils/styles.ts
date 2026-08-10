/**
 * jsdom does not resolve `var()`. `getComputedStyle(el).borderStyle` on
 * `border: 1px solid var(--cds-color-border-faint)` reads back as `'none'`, so any
 * assertion built on computed styles for a token-driven property passes vacuously — it is
 * asserting the CSS initial value, not your CSS.
 *
 * These helpers read the *declared* rule text out of the stylesheets Vite injected
 * (`css: true` in `vite.config.ts`), which is the only way to assert token-driven styling
 * in this environment.
 */

/**
 * Returns the declared `cssText` for a single class.
 *
 * Pass the imported CSS-module binding, never a literal — class names are hashed at build
 * time (`cds-sidebar-root--a1b2c`), so `'root'` never matches:
 *
 * ```ts
 * import s from '../thing.module.css'
 * expect(declaredRule(s.root)).toMatch(/border-radius:\s*var\(--cds-radii-[a-z]+\)/)
 * ```
 *
 * Throws rather than returning empty when the rule is absent — a missing rule means the
 * selector changed or the stylesheet was not injected, and both should fail loudly rather
 * than silently assert against `''`.
 */
export function declaredRule(className: string): string {
	// CSS modules can compose, producing a space-separated list; the first is the rule.
	const target = className.split(' ')[0]

	for (const sheet of Array.from(document.styleSheets)) {
		let rules: CSSRule[]
		try {
			rules = Array.from(sheet.cssRules)
		} catch {
			continue // cross-origin sheet; not ours
		}
		for (const rule of rules) {
			if (rule instanceof CSSStyleRule && rule.selectorText === `.${target}`) {
				return rule.style.cssText
			}
		}
	}

	throw new Error(
		`No declared rule found for .${target}. The selector may have changed, or the ` +
			`stylesheet was not injected — check that vite.config.ts still sets test.css = true.`
	)
}

/**
 * Returns the declared `cssText` for every rule whose selector contains the class, in
 * document order. Use for state and modifier selectors — `.root:hover`,
 * `.root[data-state='open']` — which `declaredRule` deliberately does not match.
 */
export function declaredRules(className: string): string[] {
	const target = className.split(' ')[0]
	const found: string[] = []

	for (const sheet of Array.from(document.styleSheets)) {
		let rules: CSSRule[]
		try {
			rules = Array.from(sheet.cssRules)
		} catch {
			continue
		}
		for (const rule of rules) {
			if (rule instanceof CSSStyleRule && rule.selectorText.includes(`.${target}`)) {
				found.push(rule.style.cssText)
			}
		}
	}

	return found
}

/**
 * Returns the `selectorText` of every rule mentioning the class, in document order.
 *
 * `declaredRules` deliberately returns only rule *bodies*, which cannot answer "what state
 * is this styled off?". That question is the whole substance of the Radix Tier A
 * migrations: each one moves styling from Radix's `[data-state]` / `[data-disabled]`
 * attributes onto the native `:checked`, `:indeterminate` and `:disabled` pseudo-classes,
 * and jsdom cannot verify the swap by rendering — it has no layout or paint.
 *
 * ```ts
 * const selectors = declaredSelectors(s.root).join('\n')
 * expect(selectors).toMatch(/:checked/)
 * expect(selectors).not.toMatch(/data-state/)
 * ```
 *
 * This proves the stylesheet *targets* the right state. It cannot prove the result looks
 * right — that is the Storybook a11y addon and Chromatic's job.
 */
export function declaredSelectors(className: string): string[] {
	const target = className.split(' ')[0]
	const found: string[] = []

	for (const sheet of Array.from(document.styleSheets)) {
		let rules: CSSRule[]
		try {
			rules = Array.from(sheet.cssRules)
		} catch {
			continue
		}
		for (const rule of rules) {
			if (rule instanceof CSSStyleRule && rule.selectorText.includes(`.${target}`)) {
				found.push(rule.selectorText)
			}
		}
	}

	return found
}
