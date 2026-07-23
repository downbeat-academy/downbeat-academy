const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

const UNITS: Array<[Intl.RelativeTimeFormatUnit, number]> = [
	['year', 60 * 60 * 24 * 365],
	['month', 60 * 60 * 24 * 30],
	['week', 60 * 60 * 24 * 7],
	['day', 60 * 60 * 24],
	['hour', 60 * 60],
	['minute', 60],
]

export function formatRelativeTime(date: Date | string | number): string {
	const d = date instanceof Date ? date : new Date(date)
	const diffSeconds = (d.getTime() - Date.now()) / 1000
	const absDiff = Math.abs(diffSeconds)
	for (const [unit, seconds] of UNITS) {
		if (absDiff >= seconds) {
			return rtf.format(Math.round(diffSeconds / seconds), unit)
		}
	}
	return rtf.format(Math.round(diffSeconds), 'second')
}

export function truncate(str: string | null | undefined, max = 40): string {
	if (!str) return ''
	return str.length > max ? `${str.slice(0, max - 1)}…` : str
}
