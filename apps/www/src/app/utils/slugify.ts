const slugify = (string: string) => {
  const slug = string
    .replace(/^\s+|\s+$/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
  return slug
}

export { slugify }