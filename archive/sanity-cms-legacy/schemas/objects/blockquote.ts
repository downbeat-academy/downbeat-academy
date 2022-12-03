import { FaQuoteLeft } from 'react-icons/fa';

export default {
	name: 'blockquote',
	type: 'object',
	title: 'Blockquote',
	icon: FaQuoteLeft,
	fields: [
		{
			name: 'quote',
			title: 'Quote',
			type: 'text',
		},
		{
			name: 'attribution',
			title: 'Attribution',
			type: 'string',
			description: '(Optional) Who the quote is attributed to.',
		},
		{
			name: 'sourceUrl',
			title: 'Source URL',
			type: 'url',
			description: 'Source of the attributed quote.',
		},
	],
	preview: {
		select: {
			title: 'quote',
			subtitle: 'attribution',
		},
	},
};
