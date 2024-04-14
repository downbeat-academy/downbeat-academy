const slugify = (strings: string[]) => {
  const slug = strings.map((string) => {
    const formatString = string
      .toString()
      .replace(/^\s+|\s+$/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
    return formatString
  }).join('-')

  return slug
}

export { slugify }