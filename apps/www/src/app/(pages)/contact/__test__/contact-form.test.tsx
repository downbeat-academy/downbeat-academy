import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const { sendEmail, capture, toast } = vi.hoisted(() => ({
	sendEmail: vi.fn(),
	capture: vi.fn(),
	toast: vi.fn(),
}))

vi.mock('@actions/email/send-email', () => ({ sendEmail }))
vi.mock('@lib/posthog/capture', () => ({ capture }))

vi.mock('cadence-core', async () => {
	const actual = await vi.importActual<typeof import('cadence-core')>(
		'cadence-core'
	)
	return { ...actual, useToast: () => ({ toast }) }
})

const { ContactForm } = await import('../contact-form')

// Selected by `data-testid`, matching the Cypress convention in this repo.
// `getByLabelText` does not work here: the `Label htmlFor` values point at ids
// that `Input` never renders, so nothing is actually associated.
const fillAndSubmit = async () => {
	const user = userEvent.setup()

	await user.type(screen.getByTestId('contact-name-input'), 'Ella Fitzgerald')
	await user.type(screen.getByTestId('contact-email-input'), 'ella@example.com')
	await user.type(
		screen.getByTestId('contact-message-input'),
		'A question about the handbook.'
	)
	await user.click(screen.getByTestId('contact-submit'))
}

describe('ContactForm analytics', () => {
	beforeEach(() => {
		vi.clearAllMocks()
	})

	it('captures contact_form_submitted once the email has been sent', async () => {
		sendEmail.mockResolvedValue(undefined)

		render(<ContactForm />)
		await fillAndSubmit()

		await waitFor(() => {
			expect(capture).toHaveBeenCalledWith('contact_form_submitted')
		})
	})

	it('captures only after the email has actually been sent', async () => {
		// Placement matters as much as presence — the capture must sit after
		// `await sendEmail(...)`, not before it, or a failed send would still
		// register as a conversion.
		//
		// This asserts ordering rather than forcing a rejection: the form
		// re-throws from its catch (the same pattern as the newsletter form) and
		// react-hook-form surfaces that as an unhandled rejection, which vitest
		// intercepts and fails the run on. The failure path is covered instead by
		// the Cypress `/ingest` spec, where a forced 500 exercises the real
		// error handling.
		const order: string[] = []
		sendEmail.mockImplementation(async () => {
			order.push('sendEmail')
		})
		capture.mockImplementation(() => {
			order.push('capture')
		})

		render(<ContactForm />)
		await fillAndSubmit()

		await waitFor(() => {
			expect(order).toEqual(['sendEmail', 'capture'])
		})
	})

	it('does not capture when validation blocks the submit', async () => {
		render(<ContactForm />)

		const user = userEvent.setup()
		await user.click(screen.getByRole('button', { name: /send/i }))

		await waitFor(() => {
			expect(sendEmail).not.toHaveBeenCalled()
		})
		expect(capture).not.toHaveBeenCalled()
	})
})
