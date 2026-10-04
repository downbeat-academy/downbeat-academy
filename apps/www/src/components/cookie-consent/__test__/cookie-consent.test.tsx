// Runtime matchers come from setup-tests.ts; this import brings their types
// into `typecheck`, which compiles test files without the setup file.
import '@testing-library/jest-dom/vitest'
import { afterEach, describe, expect, it } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { CONSENT_COOKIE, openConsentSettings, readConsent } from '@lib/consent'

import { CookieConsent } from '../cookie-consent'
import { CookieSettingsButton } from '../cookie-settings-button'

// jsdom applies the UA style that hides a closed popover but implements no
// `showPopover`, so the banner is always "closed" — display: none — here. Every
// query inside it therefore passes `hidden: true`. These tests cover behaviour
// (when it shows, what each choice records, where focus goes) and leave
// top-layer rendering to the browser.
const hidden = { hidden: true } as const

function setConsentCookie(value: 'granted' | 'denied') {
	document.cookie = `${CONSENT_COOKIE}=${value}; Path=/`
}

// Not by role and name: dom-accessibility-api skips display: none text when
// computing a name, so under jsdom the region has none. Its labelling is
// asserted directly instead, in 'is a region labelled by its title'.
function getBanner() {
	return document.querySelector<HTMLElement>('[data-cy="cookie-consent"]')
}

describe('CookieConsent', () => {
	afterEach(() => {
		document.cookie = `${CONSENT_COOKIE}=; Max-Age=0; Path=/`
	})

	it('shows to a visitor who has not chosen', () => {
		render(<CookieConsent />)

		const banner = getBanner()
		expect(banner).not.toBeNull()
		expect(banner).toHaveAttribute('popover', 'manual')
	})

	it('is a region labelled by its title', () => {
		render(<CookieConsent />)

		const banner = getBanner()!
		expect(banner.tagName).toBe('SECTION')
		const title = document.getElementById(banner.getAttribute('aria-labelledby')!)
		expect(title).toHaveTextContent('Cookies on Downbeat Academy')
	})

	it.each(['granted', 'denied'] as const)(
		'stays hidden once the visitor has %s',
		(value) => {
			setConsentCookie(value)

			render(<CookieConsent />)

			expect(getBanner()).toBeNull()
		}
	)

	it('offers Decline and Accept with equal weight', () => {
		// Rejecting has to be as easy as accepting. A primary Accept beside a
		// secondary Decline is the visual nudge consent guidance calls out, so
		// both render identically — same classes, Decline first.
		render(<CookieConsent />)

		const decline = screen.getByRole('button', { ...hidden, name: 'Decline' })
		const accept = screen.getByRole('button', { ...hidden, name: 'Accept' })
		expect(decline.className).toBe(accept.className)
		expect(
			decline.compareDocumentPosition(accept) & Node.DOCUMENT_POSITION_FOLLOWING
		).toBeTruthy()
	})

	it('titles itself with a heading, for heading navigation', () => {
		render(<CookieConsent />)

		expect(
			screen.getByRole('heading', { ...hidden, name: 'Cookies on Downbeat Academy' })
		).toBeInTheDocument()
	})

	it('links to the privacy policy', () => {
		render(<CookieConsent />)

		expect(screen.getByRole('link', { ...hidden, name: 'Privacy Policy' })).toHaveAttribute(
			'href',
			'/privacy-policy'
		)
	})

	it.each([
		['Accept', 'granted'],
		['Decline', 'denied'],
	] as const)('records %s and closes', async (button, expected) => {
		const user = userEvent.setup()
		render(<CookieConsent />)

		await user.click(screen.getByRole('button', { ...hidden, name: button }))

		expect(readConsent()).toBe(expected)
		expect(getBanner()).toBeNull()
	})

	it('reopens from Cookie settings, showing the current choice', async () => {
		const user = userEvent.setup()
		setConsentCookie('granted')
		render(
			<>
				<CookieConsent />
				<CookieSettingsButton />
			</>
		)
		expect(getBanner()).toBeNull()

		await user.click(screen.getByRole('button', { name: 'Cookie settings' }))

		expect(getBanner()).not.toBeNull()
		expect(
			screen.getByText('You currently allow analytics cookies.')
		).toBeInTheDocument()
	})

	it('moves focus to the banner when reopened, and back when closed', async () => {
		const user = userEvent.setup()
		setConsentCookie('denied')
		render(
			<>
				<CookieConsent />
				<CookieSettingsButton />
			</>
		)
		const trigger = screen.getByRole('button', { name: 'Cookie settings' })

		await user.click(trigger)
		expect(getBanner()).toHaveFocus()

		await user.click(screen.getByRole('button', { ...hidden, name: 'Accept' }))
		expect(readConsent()).toBe('granted')
		expect(trigger).toHaveFocus()
	})

	it('does not take focus when it appears on arrival', () => {
		render(<CookieConsent />)

		expect(getBanner()).not.toHaveFocus()
	})

	it('can be reopened programmatically', () => {
		setConsentCookie('denied')
		render(<CookieConsent />)

		act(() => openConsentSettings())

		expect(
			screen.getByText('You currently decline analytics cookies.')
		).toBeInTheDocument()
	})

	it('announces the choice in a live region that outlives the banner', async () => {
		const user = userEvent.setup()
		render(<CookieConsent />)
		const status = screen.getByRole('status')
		expect(status).toHaveTextContent('')

		await user.click(screen.getByRole('button', { ...hidden, name: 'Decline' }))

		expect(getBanner()).toBeNull()
		expect(status).toHaveTextContent('Analytics cookies declined.')
	})

	it('moves focus to <main> after choosing on arrival, instead of losing it', async () => {
		// Opened automatically, there is no trigger to return to; without a
		// fallback the unmounted button would drop focus to <body>.
		const user = userEvent.setup()
		render(
			<>
				<CookieConsent />
				<main>Page</main>
			</>
		)
		const accept = screen.getByRole('button', { ...hidden, name: 'Accept' })
		accept.focus()

		await user.click(accept)

		const main = document.querySelector('main')!
		expect(main).toHaveFocus()
		expect(main).toHaveAttribute('tabindex', '-1')
	})

	it('does not move focus if it was never inside the banner', () => {
		render(
			<>
				<CookieConsent />
				<input aria-label="Search" />
				<main>Page</main>
			</>
		)
		const search = screen.getByRole('textbox', { name: 'Search' })
		search.focus()

		// `.click()` activates the button without focusing it, standing in for a
		// choice made while focus stayed elsewhere on the page.
		act(() => {
			screen.getByRole('button', { ...hidden, name: 'Decline' }).click()
		})

		expect(search).toHaveFocus()
	})

	it('takes focus when Cookie settings is used while it is already open', async () => {
		const user = userEvent.setup()
		render(
			<>
				<CookieConsent />
				<CookieSettingsButton />
			</>
		)
		expect(getBanner()).not.toHaveFocus()

		await user.click(screen.getByRole('button', { name: 'Cookie settings' }))

		expect(getBanner()).toHaveFocus()
	})
})
