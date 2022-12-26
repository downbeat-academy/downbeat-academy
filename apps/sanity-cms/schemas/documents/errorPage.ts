import { BiErrorCircle } from 'react-icons/bi'

export default {
	name: 'errorPage',
	type: 'document',
	title: 'Error Page',
	icon: BiErrorCircle,
	fieldsets: [{ name: 'title', title: 'Title' }],
	fields: [
		{
			name: 'errorType',
			type: 'string',
			title: 'Error Type',
			options: {
				list: [
					{ title: '404: Not Found', value: '404' },
					{ title: '500: Server Error', value: '500' },
				],
				layout: 'dropdown',
			},
		},
		{
			name: 'title',
			type: 'string',
			title: 'Title',
			fieldset: 'title',
			description: 'Enter the title for the error page.',
			validation: (Rule) => [
				Rule.required()
					.min(5)
					.error('The page title should be longer than 5 characters.'),
				Rule.required()
					.max(96)
					.warning(
						'Thats a pretty long title, you might want to provide a shorter title.'
					),
				Rule.required().error('You must enter a title for the page.'),
			],
		},
		{
			name: 'showTitle',
			title: 'Show Title',
			type: 'boolean',
			fieldset: 'title',
			description:
				'Choose whether the title of the page should be shown. Defaults to true.',
		},
		{
			name: 'metadata',
			title: 'Metadata',
			type: 'metadata',
		},
		{
			name: 'moduleContent',
			title: 'Module Content',
			type: 'moduleContent',
		},
	],
	preview: {
		select: {
			title: 'errorType',
			subtitle: 'title',
		},
	},
}
