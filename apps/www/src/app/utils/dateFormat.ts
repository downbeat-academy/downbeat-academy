import { format, parseISO } from 'date-fns'

const prettyDate = (date: string, formatType?: string) => {
	const isoDate = parseISO(date)
	const formattedDate = format(isoDate, formatType)
	return formattedDate
}

export { prettyDate }
