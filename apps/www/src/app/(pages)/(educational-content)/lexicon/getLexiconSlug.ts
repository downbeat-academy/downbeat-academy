import { slugify } from "@utils/slugify";
import { getTime } from "@utils/getTime";

const getLexiconSlug = (lexicon) => {
  const slug = slugify([
    lexicon.artist,
    lexicon.album,
    lexicon.track
  ]) + '-' + getTime(lexicon.timestamp).totalTimeToString;
  return slug;
}

export { getLexiconSlug }