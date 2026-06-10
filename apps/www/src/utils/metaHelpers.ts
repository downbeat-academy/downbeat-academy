const getOgTitle = (title: string) => {
	return title + ' ♪ Downbeat Academy'
}

const limitDescription = (description: string) => {
	return description.length > 200 ? description.substring(0, 200) : description
}

export { getOgTitle, limitDescription }
