import { describe, it, expect } from 'vitest'
import { isValidUrl, normalizeUrl } from './url-validator'

describe('isValidUrl', () => {
	it('accepts valid https URLs', () => {
		expect(isValidUrl('https://example.com')).toBe(true)
		expect(isValidUrl('https://www.example.com')).toBe(true)
		expect(isValidUrl('https://example.com/path')).toBe(true)
		expect(isValidUrl('https://example.com/path?query=value')).toBe(true)
		expect(isValidUrl('https://example.com:8080')).toBe(true)
	})

	it('accepts valid http URLs', () => {
		expect(isValidUrl('http://example.com')).toBe(true)
		expect(isValidUrl('http://www.example.com')).toBe(true)
		expect(isValidUrl('http://example.com/path')).toBe(true)
	})

	it('rejects URLs with invalid protocols', () => {
		expect(isValidUrl('ftp://example.com')).toBe(false)
		expect(isValidUrl('file:///path/to/file')).toBe(false)
		expect(isValidUrl('javascript:alert(1)')).toBe(false)
		expect(isValidUrl('data:text/html,<h1>Hello</h1>')).toBe(false)
	})

	it('rejects invalid URLs', () => {
		expect(isValidUrl('')).toBe(false)
		expect(isValidUrl('not-a-url')).toBe(false)
		expect(isValidUrl('example.com')).toBe(false) // Missing protocol
		expect(isValidUrl('://example.com')).toBe(false)
		expect(isValidUrl('https://')).toBe(false)
	})

	it('rejects completely malformed URLs', () => {
		// Note: Some "malformed" URLs like 'http:/example.com' are actually parsed
		// by the URL constructor as valid (treating example.com as a path).
		// We only test cases that truly fail URL parsing.
		expect(isValidUrl('://example.com')).toBe(false)
		expect(isValidUrl('ht tp://example.com')).toBe(false) // Space in protocol
	})
})

describe('normalizeUrl', () => {
	it('adds https:// when no protocol is specified', () => {
		expect(normalizeUrl('example.com')).toBe('https://example.com')
		expect(normalizeUrl('www.example.com')).toBe('https://www.example.com')
	})

	it('preserves existing http:// protocol', () => {
		expect(normalizeUrl('http://example.com')).toBe('http://example.com')
	})

	it('preserves existing https:// protocol', () => {
		expect(normalizeUrl('https://example.com')).toBe('https://example.com')
	})

	it('removes trailing slashes from root URLs', () => {
		expect(normalizeUrl('https://example.com/')).toBe('https://example.com')
		expect(normalizeUrl('example.com/')).toBe('https://example.com')
	})

	it('removes trailing slashes from paths', () => {
		expect(normalizeUrl('https://example.com/path/')).toBe('https://example.com/path')
		expect(normalizeUrl('example.com/path/to/page/')).toBe('https://example.com/path/to/page')
	})

	it('preserves query strings and hashes', () => {
		expect(normalizeUrl('https://example.com?query=value')).toBe(
			'https://example.com?query=value'
		)
		expect(normalizeUrl('https://example.com#section')).toBe('https://example.com#section')
		expect(normalizeUrl('https://example.com?query=value#section')).toBe(
			'https://example.com?query=value#section'
		)
	})

	it('trims whitespace from input', () => {
		expect(normalizeUrl('  https://example.com  ')).toBe('https://example.com')
		expect(normalizeUrl('  example.com  ')).toBe('https://example.com')
	})

	it('preserves port numbers', () => {
		expect(normalizeUrl('https://example.com:8080')).toBe('https://example.com:8080')
		expect(normalizeUrl('example.com:3000')).toBe('https://example.com:3000')
	})
})
