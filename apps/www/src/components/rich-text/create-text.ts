type RichTextNode = {
	_type: string
	children?: RichTextNode[]
	text?: string
	style?: string
}

export const extractPlainText = (content: RichTextNode[]): string => {
	if (!content) return ''

	return content
		.map((node) => {
			// Handle text nodes
			if (node._type === 'span' && node.text) {
				return node.text
			}

			// Handle block nodes (headings, paragraphs)
			if (node._type === 'block' && node.children) {
				const text = node.children.map((child) => child.text || '').join('')

				// Add extra line breaks for headings
				if (node.style?.startsWith('h')) {
					return `\n${text}\n`
				}

				return text
			}

			// Recursively handle nested content
			if (node.children) {
				return extractPlainText(node.children)
			}

			return ''
		})
		.join(' ')
		.replace(/\s+/g, ' ')
		.trim()
}
