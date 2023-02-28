import { author } from "../../../types/author"

interface HomepageTemplateProps {
  articles: [{
    featuredImage: string,
    title: string,
    slug: string,
    authors: author[],
    date: string,
    _id: string,
  }],
  featuredArticle: any,
}

export type { HomepageTemplateProps }