import { BiDetail } from 'react-icons/bi';

export default {
	name: `form`,
	title: `Form`,
	type: `object`,
	icon: BiDetail,
	preview: {
		select: {
			title: `title`,
		},
	},
	fields: [
		{
			name: `title`,
			title: `Form Title`,
			type: `string`,
			description: `Provide a descriptive name for your form.`,
			validation: (Rule) => [
				Rule.required().error(`The form needs a title.`),
			],
		},
		{
			name: `method`,
			title: `Method`,
			type: `string`,
			description: `Define what the submission method of the form is.`,
			options: {
				list: [`POST`, `GET`],
				layout: `radio`,
				direction: `horizontal`,
			},
			validation: (Rule) => [
				Rule.required().error(
					`Please select a submit method, otherwise the application won't be able to determine what to do with the form.`
				),
			],
		},
		{
			name: `fields`,
			title: `Fields`,
			type: `array`,
			description: `Select and define the fields in your form.`,
			of: [{ type: `input` }, { type: `textarea` }],
		},
		{
			name: 'submitText',
			title: 'Submit text',
			type: 'string',
			description: 'Text content within the submit button.',
		},
	],
};
