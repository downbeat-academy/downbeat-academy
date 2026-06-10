const transformAccidental = (value: string) => {
	switch (value) {
		case 'flat':
			return '𝄭'
		case 'sharp':
			return '𝄰'
		case 'double-flat':
			return '𝄫'
		case 'double-sharp':
			return '𝄪'
		case 'natural':
			return '♮'
		default:
			return null
	}
}

export { transformAccidental }
