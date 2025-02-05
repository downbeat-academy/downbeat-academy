export default {
	name: 'input',
	title: 'Text Input',
	type: 'object',
	description: 'Text input field.',
	fields: [
		{
			name: 'type',
			title: 'Type',
			type: 'string',
			options: {
				list: ['email', 'text', 'number', 'hidden', 'phone'],
				layout: 'dropdown',
			},
		},
		{
			name: 'name',
			title: 'Name',
			type: 'string',
			description: 'Enter a semantic name for the input field.',
		},
		{
			name: 'label',
			title: 'Label',
			type: 'string',
			validation: (Rule: any) => [
				Rule.required().warning(
					`It's recommended to define a label for the input for accessibility.`
				),
			],
		},
		{
			name: 'placeholder',
			title: 'Placeholder',
			type: 'string',
			description:
				'Provide the user with an example of what they should enter.',
		},
		{
			name: 'helperText',
			title: 'Helper Text',
			type: 'string',
			description:
				'Help the user fill out the form with the correct information.',
		},
		{
			name: 'autocomplete',
			title: 'Autocomplete',
			type: 'boolean',
			description:
				'Determine whether the field can be automatically filled by the browser based on historical user input.',
		},
	],
	preview: {
		select: {
			title: 'name',
			subtitle: 'type',
		},
	},
}
