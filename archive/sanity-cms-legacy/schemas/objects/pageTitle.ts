import { MdTitle } from 'react-icons/md';

export default {
	name: 'pageTitle',
	title: 'Page Title',
	type: 'object',
	icon: MdTitle,
	fields: [
		{
			name: 'alignment',
			title: 'Alignment',
			type: 'string',
			options: {
				list: [
					{ title: 'Left', value: 'left' },
					{ title: 'Center', value: 'center' },
					{ title: 'Right', value: 'right' },
				],
				layout: 'radio',
				direction: 'horizontal',
			},
		},
		{
			name: 'subtitle',
			title: 'Subtitle',
			type: 'string',
		},
		{
			name: 'title',
			title: 'Title',
			type: 'text',
		},
	],
	preview: {
		select: {
			title: 'subtitle',
			subtitle: 'title',
		},
	},
};
