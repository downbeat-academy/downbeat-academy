const getColor = (color: string) => {
	switch (color) {
		case 'brand':
			return 'var(--color-foreground-brand-default)'
		case 'secondary':
			return 'var(--color-foreground-strong)'
		case 'high-contrast':
			return 'var(--color-foreground-high-contrast)'
	}
}

export { getColor }
