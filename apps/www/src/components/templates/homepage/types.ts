interface HomepageTemplateProps {
  articles: [{
    featuredImage: string,
    title: string,
    slug: string,
    authors: any[],
    date: string,
    _id: string,
  }],
  featuredArticle: any,
}

export type { HomepageTemplateProps }