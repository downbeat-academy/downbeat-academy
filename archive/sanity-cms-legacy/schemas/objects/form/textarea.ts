export default {
	name: `textarea`,
	title: `Textarea`,
	type: `object`,
	fields: [
		{
			name: `name`,
			title: `Name`,
			type: `string`,
			description: `Enter a semantic name for the textarea field.`,
		},
		{
			name: 'label',
			title: 'Label',
			type: 'string',
			validation: (Rule) => [
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
				'Enter an example of what the user can enter into the message.',
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
			subtitle: 'placeholder',
		},
	},
};
