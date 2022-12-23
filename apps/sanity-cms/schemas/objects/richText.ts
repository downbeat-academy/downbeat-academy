import { BiLinkExternal, BiLinkAlt, BiText } from 'react-icons/bi';
import { GiMusicalScore } from 'react-icons/gi';

export default {
	name: 'richText',
	type: 'object',
	title: 'Rich Text',
	icon: BiText,
	fields: [
		{
			name: 'content',
			title: 'Content',
			type: 'array',
			of: [
				{
					type: 'block',
					title: 'Block',
					styles: [
						{ title: 'Normal', value: 'normal' },
						{ title: 'H2', value: 'h2' },
						{ title: 'H3', value: 'h3' },
						{ title: 'H4', value: 'h4' },
						{ title: 'H5', value: 'h5' },
						{ title: 'H6', value: 'h6' },
						// { title: 'Quote', value: 'blockquote' },
					],
					lists: [
						{ title: 'Bullet', value: 'bullet' },
						{ title: 'Number', value: 'number' },
					],
					marks: {
						decorators: [
							{ title: 'Strong', value: 'strong' },
							{ title: 'Emphasis', value: 'em' },
							{ title: 'Underline', value: 'underline' },
							{ title: 'Strike', value: 'strike-through' },
							{ title: 'Code', value: 'code' },
						],
						annotations: [
							{
								name: 'link',
								type: 'object',
								title: 'External Link',
								icon: BiLinkExternal,
								fields: [
									{
										title: 'URL',
										name: 'href',
										type: 'url',
										validation: (Rule) => [
											Rule.regex(
												/https:\/\/(www\.|)(portabletext\.org|sanity\.io)\/.*/gi,
												{
													name: 'internal url',
													invert: true,
												}
											).warning(
												'This is not a valid link, please check what you entered.'
											),
										],
									},
								],
							},
							{
								name: 'internalLink',
								type: 'object',
								title: 'Internal Link',
								icon: BiLinkAlt,
								fields: [
									{
										name: 'reference',
										type: 'reference',
										to: [
											{ type: 'page' },
											{ type: 'article' },
											{ type: 'podcast' },
											{ type: 'person' },
											{ type: 'landingPage' },
										],
									},
								],
							},
						],
					},
					// Inline Custom Types
					of: [{ type: 'inlineChord' }, { type: 'inlineMusicText' }],
				},
				// Custom Types
				// { type: 'video' },
				{ type: 'audio' },
				{ type: 'musicNotation' },
				{ type: 'mainImage' },
				{ type: 'blockquote' },
			],
		},
	],
};
