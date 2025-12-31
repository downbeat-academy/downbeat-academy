import { describe, it, expect } from 'vitest'
import { AVAILABLE_DOMAINS, DEFAULT_DOMAIN } from './domains'

describe('AVAILABLE_DOMAINS', () => {
	it('contains the expected domains', () => {
		expect(AVAILABLE_DOMAINS).toContain('https://dwnbe.at')
		expect(AVAILABLE_DOMAINS).toContain('https://downbeatacademy.services')
		expect(AVAILABLE_DOMAINS).toContain('https://downbeatacade.my')
	})

	it('has at least one domain available', () => {
		expect(AVAILABLE_DOMAINS.length).toBeGreaterThan(0)
	})

	it('all domains start with https://', () => {
		for (const domain of AVAILABLE_DOMAINS) {
			expect(domain.startsWith('https://')).toBe(true)
		}
	})

	it('all domains are valid URLs', () => {
		for (const domain of AVAILABLE_DOMAINS) {
			expect(() => new URL(domain)).not.toThrow()
		}
	})

	it('no domains have trailing slashes', () => {
		for (const domain of AVAILABLE_DOMAINS) {
			expect(domain.endsWith('/')).toBe(false)
		}
	})
})

describe('DEFAULT_DOMAIN', () => {
	it('is set to the first available domain', () => {
		expect(DEFAULT_DOMAIN).toBe(AVAILABLE_DOMAINS[0])
	})

	it('is a valid https URL', () => {
		expect(DEFAULT_DOMAIN.startsWith('https://')).toBe(true)
		expect(() => new URL(DEFAULT_DOMAIN)).not.toThrow()
	})
})
