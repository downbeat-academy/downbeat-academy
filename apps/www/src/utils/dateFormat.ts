import { format, parseISO } from 'date-fns'

const prettyDate = (date: string | undefined | null, formatType = 'MMMM do, yyyy') => {
	if (!date) {
		return ''
	}
	try {
		const formattedDate = format(parseISO(date), formatType)
		return formattedDate
	} catch (error) {
		console.error('Error formatting date:', date, error)
		return ''
	}
}

export { prettyDate }
