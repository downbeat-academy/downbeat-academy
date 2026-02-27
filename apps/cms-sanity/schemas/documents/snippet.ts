import { BiCut } from 'react-icons/bi'

export default {
	name: 'snippet',
	title: 'Snippet',
	type: 'document',
	icon: BiCut,
	groups: [
		{
			name: 'content',
			title: 'Content',
		},
		{
			name: 'changelog',
			title: 'Changelog',
		},
	],
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string',
			group: 'content',
			validation: (Rule: any) => [
				Rule.required()
					.min(5)
					.max(96)
					.error('The title must be between 5 and 96 characters.'),
			],
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			group: 'content',
			validation: (Rule: any) => [
				Rule.required().error('The snippet needs a slug.'),
			],
		},
		{
			name: 'changelog',
			title: 'Changelog',
			type: 'array',
			group: 'changelog',
			description:
				'Track meaningful changes to this snippet over time. Each entry appears in a changelog drawer on the published page.',
			of: [{ type: 'changelogEntry' }],
			options: {
				sortable: true,
			},
		},
	],
}
