import React from 'react';
import { 
	Info,
	Award,
	BookAlt,
	Book,
	Calendar,
	CalendarX,
	CalendarCheck,
	CalendarPlus,
	CalendarMinus,
	CalendarExclamation,
	CalendarEdit,
	CalendarEvent,
	CalendarHeart,
	CalendarStar,
	CalendarWeek,
	Close,
	Megaphone,
	Warning,
	Error,
	CheckCircle,
	ExternalLink,
	QuoteLeft,
	QuoteRight,
} from './index';
import { Flex } from '../layout'

export default {
	title: 'Foundations/Icons/Interface',
	argTypes: {
		size: {
			options: ['extraSmall', 'small', 'medium', 'large'],
			control: { type: 'radio' },
		},
		color: 'color',
	},
};

export const Interface = (args) => {
	return (
		<Flex
			direction='row'
			gap='4'
		>
			<Info {...args} />
			<Award {...args} />
			<BookAlt {...args} />
			<Book {...args} />
			<Calendar {...args} />
			<CalendarX {...args} />
			<CalendarCheck {...args} />
			<CalendarPlus {...args} />
			<CalendarMinus {...args} />
			<CalendarExclamation {...args} />
			<CalendarEdit {...args} />
			<CalendarEvent {...args} />
			<CalendarHeart {...args} />
			<CalendarStar {...args} />
			<CalendarWeek {...args} />
			<Close {...args} />
			<Megaphone {...args} />
			<Warning {...args} />
			<Error {...args} />
			<CheckCircle {...args} />
			<ExternalLink {...args} />
			<QuoteLeft {...args} />
			<QuoteRight {...args} />
		</Flex>
	)
}

Interface.args = {
	size: 'small',
	color: '$blackberry1000',
}

Interface.parameters = {
	design: {
		type: 'figma',
		url: 'https://www.figma.com/file/tX0lYmayOr7NR0T3bdM90Y/Foundations?node-id=3%3A171'
	}
}