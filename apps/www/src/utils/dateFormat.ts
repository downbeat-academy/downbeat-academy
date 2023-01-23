import { format, parseISO } from 'date-fns'

interface PrettyDateProps {
  date: any,
  formatType?: any
}

const prettyDate = ({
  date,
  formatType = 'MMM do, yyyy'
}: PrettyDateProps) => {
  const isoDate = parseISO(date);
  const formattedDate = format(date, formatType);
  return formattedDate;
}

export { prettyDate }