import { format, parseISO } from 'date-fns'

const prettyDate = (date, formatType = 'MMMM do, yyyy') => {
	const formattedDate = format(parseISO(date), formatType)
	return formattedDate
}

export { prettyDate }
