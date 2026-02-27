import { BiRevision } from 'react-icons/bi'

export default {
	name: 'changelogEntry',
	title: 'Changelog Entry',
	type: 'object',
	icon: BiRevision,
	fields: [
		{
			name: 'date',
			title: 'Date',
			type: 'date',
			description: 'The date this change was made.',
			validation: (Rule: any) => [
				Rule.required().error(
					'A date is required for the changelog entry.'
				),
			],
		},
		{
			name: 'summary',
			title: 'Summary',
			type: 'string',
			description:
				'A brief description of the change (e.g., "Updated chord progression examples").',
			validation: (Rule: any) => [
				Rule.required().error('A summary is required.'),
				Rule.max(200).warning('Keep the summary concise.'),
			],
		},
		{
			name: 'description',
			title: 'Description',
			type: 'text',
			rows: 3,
			description: 'Optional longer description of the change.',
		},
	],
	preview: {
		select: {
			title: 'summary',
			subtitle: 'date',
		},
	},
}
