'use client'

import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { Flex, Text } from 'cadence-core'

import { Button } from '@components/ui/button'
import { Link } from '@components/link'
import {
	subscribeToConsentSettings,
	useAnalyticsConsent,
	writeConsent,
	type ConsentDecision,
} from '@lib/consent'

import s from './cookie-consent.module.css'

const CONFIRMATION: Record<ConsentDecision, string> = {
	granted: 'Analytics cookies allowed.',
	denied: 'Analytics cookies declined.',
}

/**
 * Where focus goes when the banner closes and there is nowhere better: the
 * page's `<main>`, made programmatically focusable. Without this, choosing on
 * arrival unmounts the focused button and drops focus to `<body>`, and a
 * keyboard user starts again from the top of the page.
 */
function focusFallback() {
	const main = document.querySelector('main')
	if (!main) return
	if (!main.hasAttribute('tabindex')) main.setAttribute('tabindex', '-1')
	main.focus({ preventScroll: true })
}

/**
 * The analytics-cookie banner.
 *
 * Shown until the visitor accepts or declines, and again whenever the footer's
 * "Cookie settings" asks for it. It is a manual popover rather than a modal
 * dialog: it sits in the top layer above the page without making the page
 * inert, because reading the site does not depend on answering. `manual` also
 * means Esc and clicking elsewhere do not close it — only a choice does.
 *
 * It is a labelled region, so it is a landmark screen-reader users can jump
 * to, and it does not take focus on arrival — stealing focus from a page the
 * visitor is reading would be worse. Mount it early in the document: the top
 * layer makes its visual position independent of DOM order, but tab order is
 * not.
 *
 * Accept and Decline are deliberately identical in weight. Rejecting has to be
 * as easy as accepting, and a primary/secondary pair is the visual nudge
 * consent guidance calls out.
 */
export function CookieConsent() {
	const consent = useAnalyticsConsent()
	const [isReopened, setIsReopened] = useState(false)
	const [confirmation, setConfirmation] = useState('')
	const rootRef = useRef<HTMLElement>(null)
	const returnFocusTo = useRef<HTMLElement | null>(null)
	const titleId = useId()
	const descriptionId = useId()

	useEffect(
		() =>
			subscribeToConsentSettings(() => {
				const root = rootRef.current
				const active = document.activeElement

				// Remember where to return to — unless focus is already inside the
				// banner, as when "Cookie settings" is used while it is open.
				if (!root?.contains(active)) {
					returnFocusTo.current = active instanceof HTMLElement ? active : null
				}
				setConfirmation('')
				setIsReopened(true)

				// Already open, so the layout effect will not re-run: move focus here.
				root?.focus()
			}),
		[]
	)

	const isOpen = consent === 'pending' || (consent !== undefined && isReopened)

	// Layout effect, so the popover is in the top layer before the first paint
	// — otherwise it flashes in normal flow at its DOM position.
	useLayoutEffect(() => {
		const root = rootRef.current
		if (!isOpen || !root) return

		if (typeof root.showPopover === 'function' && !root.matches(':popover-open')) {
			root.showPopover()
		}

		// Opened by the visitor from "Cookie settings": move focus to the banner
		// so its label is announced and the choice is the next tab stop. Opened
		// automatically on arrival: leave focus where it is.
		if (isReopened) root.focus()
	}, [isOpen, isReopened])

	const decide = (decision: ConsentDecision) => {
		const hadFocus = rootRef.current?.contains(document.activeElement) ?? false

		writeConsent(decision)
		setIsReopened(false)
		setConfirmation(CONFIRMATION[decision])

		const target = returnFocusTo.current
		returnFocusTo.current = null
		if (target?.isConnected) target.focus()
		else if (hadFocus) focusFallback()
	}

	return (
		<>
			{/*
			 * Outside the banner, because the banner unmounts on a choice and a
			 * live region has to exist before its content changes to be announced.
			 */}
			<p role="status" className={s.visuallyHidden}>
				{confirmation}
			</p>
			{isOpen && (
				<section
					ref={rootRef}
					popover="manual"
					aria-labelledby={titleId}
					aria-describedby={descriptionId}
					tabIndex={-1}
					className={s.root}
					data-cy="cookie-consent"
				>
					<Flex direction="column" gap="medium">
						<Flex direction="column" gap="2x-small">
							<Text
								tag="h2"
								id={titleId}
								type="productive-headline"
								size="h6"
								color="strong"
							>
								Cookies on Downbeat Academy
							</Text>
							<Text
								tag="p"
								id={descriptionId}
								type="productive-body"
								size="body-small"
								color="primary"
							>
								We&apos;d like to use analytics cookies to understand how the
								site is used and improve it. If you decline, we still count
								visits anonymously, without storing anything on your device.
								You can change your mind at any time from Cookie settings in
								the footer. See our{' '}
								<Link href="/privacy-policy">Privacy Policy</Link>.
							</Text>
							{consent !== 'pending' && (
								<Text
									tag="p"
									type="productive-body"
									size="body-small"
									color="primary"
								>
									{consent === 'granted'
										? 'You currently allow analytics cookies.'
										: 'You currently decline analytics cookies.'}
								</Text>
							)}
						</Flex>
						<Flex direction="row" gap="small" justifyContent="end" wrap>
							<Button
								variant="secondary"
								size="small"
								onClick={() => decide('denied')}
							>
								Decline
							</Button>
							<Button
								variant="secondary"
								size="small"
								onClick={() => decide('granted')}
							>
								Accept
							</Button>
						</Flex>
					</Flex>
				</section>
			)}
		</>
	)
}
