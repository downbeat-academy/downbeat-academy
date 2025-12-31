export const AVAILABLE_DOMAINS = [
	'https://dwnbe.at',
	'https://downbeatacademy.services',
	'https://downbeatacade.my',
] as const

export type AvailableDomain = (typeof AVAILABLE_DOMAINS)[number]

export const DEFAULT_DOMAIN = AVAILABLE_DOMAINS[0]
