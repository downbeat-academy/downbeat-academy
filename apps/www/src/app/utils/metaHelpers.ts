const getOgTitle = (title) => {
  return title + ' ♪ Downbeat Academy'
}

const limitDescription = (description) => {
  description > 200 ? description.substring(0, 200) : description
}

export {
  getOgTitle,
  limitDescription
}