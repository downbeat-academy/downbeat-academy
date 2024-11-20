const getTocItems = (items: any[]) => {
  const mapItems = items.map((item) => {
    switch (item.style) {
      case 'h1': return item;
      case 'h2': return item;
      case 'h3': return item;
      default: return null;
    }
  })
  const filteredItems = mapItems.filter((item) => item !== null && item !== undefined);
  return filteredItems;
}

export { getTocItems }