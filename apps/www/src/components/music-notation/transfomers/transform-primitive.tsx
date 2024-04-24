const transformAccidental = (value: string) => {
	switch (value) {
		case 'flat':
			return '𝄭'
		case 'share':
			return '𝄰'
		case 'double-flat':
			return '𝄫'
		case 'double-sharp':
			return '𝄪'
		case 'natural':
			return '♮'
		default:
			'Unsupported accidental.'
	}
}

export { transformAccidental }
