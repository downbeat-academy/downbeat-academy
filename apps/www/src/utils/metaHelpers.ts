const getOgTitle = (title?: string) => {
	if (!title) return 'Downbeat Academy'
	return title + ' ♪ Downbeat Academy'
}

const limitDescription = (description?: string) => {
	return description && description.length > 200
		? description.substring(0, 200)
		: description
}

export { getOgTitle, limitDescription }
