const deslugify = (slug: string): { string: string; sentence: string } => {
  // Return a basic string
  const string = slug.replace(/-/g, ' ');

  // Split the slug into words
  const words = slug.split('-');

  // Capitalize the first word
  if (words.length > 0) {
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  }

  //
  const sentence = words.join(' ');

  return {
    string,
    sentence,
  };
};

export { deslugify };
