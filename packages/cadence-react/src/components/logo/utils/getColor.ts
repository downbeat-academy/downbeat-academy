const getColor = (color: string) => {
	switch (color) {
		case 'brand':
			return '#5665ef'
		case 'secondary':
			return '#181e3b'
		case 'high-contrast':
			return '#ffffff'
	}
}

export { getColor }
