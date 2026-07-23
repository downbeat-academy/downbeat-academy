import { describe, expect, it } from 'vitest'
import { linkResolver } from '../link-resolver'

describe('linkResolver', () => {
	it('maps each known category to its route prefix', () => {
		expect(linkResolver('home', 'page')).toBe('/home')
		expect(linkResolver('my-post', 'article')).toBe('/articles/my-post')
		expect(linkResolver('jazz', 'category')).toBe('/categories/jazz')
		expect(linkResolver('john', 'contributor')).toBe('/contributors/john')
		expect(linkResolver('jane', 'person')).toBe('/contributors/jane')
		expect(linkResolver('ep-1', 'podcast')).toBe('/podcasts/ep-1')
		expect(linkResolver('cheatsheet', 'resource')).toBe('/resources/cheatsheet')
		expect(linkResolver('promo', 'landingPage')).toBe('/p/promo')
		expect(linkResolver('intro', 'handbook')).toBe('/handbook/intro')
		expect(linkResolver('cadence', 'lexicon')).toBe('/lexicon/cadence')
	})

	it('resolves the category route via the single canonical case', () => {
		// Regression guard for the removed duplicate `case 'category'`: there must be
		// exactly one reachable mapping and it must still resolve correctly.
		expect(linkResolver('rhythm', 'category')).toBe('/categories/rhythm')
	})

	it('returns "/" when the url is falsy', () => {
		expect(linkResolver('', 'article')).toBe('/')
	})

	it('returns the bare url for an unknown category', () => {
		expect(linkResolver('whatever', 'unknown')).toBe('whatever')
	})
})
