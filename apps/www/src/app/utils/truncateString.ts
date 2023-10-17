const truncateString = (str: string, chars: number): string => {
  if (str.length < chars) {
    return str
  } else {
    return str.slice(0, chars) + "...";
  }
}

export { truncateString }