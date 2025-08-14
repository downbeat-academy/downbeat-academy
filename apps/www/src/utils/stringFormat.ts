const toKebabCase = (str: string) => {
	const matches = str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
	return matches ? matches.map((x) => x.toLowerCase()).join('-') : str
}

export { toKebabCase }
