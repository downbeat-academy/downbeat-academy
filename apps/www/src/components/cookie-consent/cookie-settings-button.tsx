'use client'

import { openConsentSettings } from '@lib/consent'

export interface CookieSettingsButtonProps {
	className?: string
}

/**
 * Reopens the cookie banner so the visitor can change their choice. A button,
 * not a link — it navigates nowhere — styled by the caller to sit among links.
 */
export function CookieSettingsButton({ className }: CookieSettingsButtonProps) {
	return (
		<button type="button" className={className} onClick={openConsentSettings}>
			Cookie settings
		</button>
	)
}
