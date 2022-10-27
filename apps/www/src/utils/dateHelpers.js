import { format, parseISO } from 'date-fns';

export const formatIso = (iso) => {
	const parseDate = parseISO(iso);
	const formatDate = format(parseDate, 'MMM do, yyyy');

	return formatDate;
};
