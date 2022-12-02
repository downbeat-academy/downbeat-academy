import { BiFile } from 'react-icons/bi';

export default {
	name: `page`,
	type: `document`,
	title: `Page`,
	icon: BiFile,
	fieldsets: [{ name: `title`, title: `Title` }],
	fields: [
		{
			name: `title`,
			type: `string`,
			title: `Title`,
			fieldset: `title`,
			description: `Enter the title for the page.`,
			validation: (Rule) => [
				Rule.required()
					.min(5)
					.error(
						`The page title should be longer than 5 characters.`
					),
				Rule.required()
					.max(96)
					.warning(
						`That's a pretty long title, you might want to provide a shorter title.`
					),
				Rule.required().error(`You must enter a title for the page.`),
			],
		},
		{
			name: `showTitle`,
			title: `Show Title`,
			type: `boolean`,
			fieldset: `title`,
			description: `Choose whether the title of the page should be shown. Defaults to true.`,
			initialValue: true,
		},
		{
			name: `slug`,
			title: `Slug`,
			type: `slug`,
			description: `The slug determines the canonical organization of this page within the application.`,
			options: {
				source: `title`,
			},
			validation: (Rule) => [
				Rule.required().error(
					`The page needs a slug. Create one based on the title with "generate"`
				),
			],
		},
		{
			name: `metadata`,
			title: `Metadata`,
			type: `metadata`,
		},
		{
			name: `moduleContent`,
			title: `Module Content`,
			type: `moduleContent`,
		},
	],
	preview: {
		select: {
			title: `title`,
		},
	},
};
